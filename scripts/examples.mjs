/**
 * Run every JavaScript example in the docs against the installed `poker-calculations`.
 *
 *   pnpm check:examples            fail if any example throws
 *   pnpm check:examples --write    also rewrite each example's ```text title="Output"``` block
 *
 * API pages (docs/reference/api) run each example on its own. Other pages run their examples
 * in order as one script, so a later block may use variables from an earlier one.
 * Output blocks titled "Output (varies)" are never rewritten. Monte Carlo digits can differ
 * between platforms (std::shuffle is implementation-defined), so check mode only reports
 * output differences; it fails on errors.
 */
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const only = args.find((a) => !a.startsWith('--'));
const TIMEOUT_MS = 120_000;
const CONCURRENCY = Math.max(2, Math.min(8, os.cpus().length));
const MARK = '␞EXAMPLE-END␞';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

/** Code fences in order, with the example → output pairing. */
function parse(src) {
  const fences = [...src.matchAll(/```(\w*)([^\n]*)\n([\s\S]*?)```/g)].map((m) => ({
    lang: m[1],
    meta: m[2],
    code: m[3],
    start: m.index,
    end: m.index + m[0].length,
  }));
  const examples = [];
  for (let i = 0; i < fences.length; i++) {
    const f = fences[i];
    if (!/^(js|javascript)$/.test(f.lang) || /^\s*import\s/m.test(f.code)) continue;
    const next = fences[i + 1];
    const between = next ? src.slice(f.end, next.start) : '';
    const output = next && next.lang === 'text' && /title="Output/.test(next.meta) && /^\s*$/.test(between) ? next : null;
    examples.push({code: f.code, fence: f, output});
  }
  return examples;
}

function run(code, cwd) {
  const file = path.join(cwd, `example-${process.pid}-${Math.random().toString(36).slice(2)}.cjs`);
  fs.writeFileSync(file, `(async () => {\n${code}\n})().catch((e) => { console.error(e && e.stack || e); process.exit(1); });\n`);
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [file], {cwd, stdio: ['ignore', 'pipe', 'pipe']});
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    const timer = setTimeout(() => child.kill('SIGKILL'), TIMEOUT_MS);
    child.on('exit', (code, signal) => {
      clearTimeout(timer);
      fs.rmSync(file, {force: true});
      resolve({ok: code === 0, out, err: signal ? `timed out after ${TIMEOUT_MS / 1000}s` : err.trim()});
    });
  });
}

function formatOutput(out) {
  const lines = out.replace(/\s+$/, '').split('\n');
  let text = lines.slice(0, 16).join('\n');
  if (lines.length > 16) text += '\n…';
  return text.length > 1400 ? text.slice(0, 1400) + '\n…' : text;
}

// Snippets must resolve `poker-calculations` from this repo's node_modules.
const tmp = path.join(root, 'node_modules', '.examples');
fs.mkdirSync(tmp, {recursive: true});

const files = walk(path.join(root, 'docs')).filter((f) => !only || f.includes(only));
const jobs = [];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const examples = parse(src);
  if (!examples.length) continue;
  const isApi = file.split(path.sep).join('/').includes('/docs/reference/api/');
  if (isApi) {
    examples.forEach((ex) => jobs.push({file, src, examples: [ex], standalone: true}));
  } else {
    jobs.push({file, src, examples, standalone: false});
  }
}

const results = new Map(); // example -> {ok, out, err}
let next = 0;
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    let code;
    if (job.standalone) {
      code = job.examples[0].code;
    } else {
      // One script per page; drop repeated `const poker = require(...)` lines after the first.
      let seenRequire = false;
      code = job.examples
        .map((ex) =>
          ex.code.replace(/^const poker = require\(['"]poker-calculations['"]\);?[ \t]*$/m, (line) => {
            if (seenRequire) return '';
            seenRequire = true;
            return line;
          }),
        )
        .map((c) => `${c}\nconsole.log(${JSON.stringify(MARK)});`)
        .join('\n');
      if (!seenRequire && /\bpoker\./.test(code)) code = "const poker = require('poker-calculations');\n" + code;
    }
    const r = await run(code, tmp);
    const parts = r.out.split(`${MARK}\n`);
    job.examples.forEach((ex, i) => {
      const done = job.standalone ? r.ok : i < parts.length - 1 || r.ok;
      const out = job.standalone ? r.out : parts[i] ?? '';
      // Printing `undefined` always means the example reads a field or index that does not exist.
      const silentBug = done && /\bundefined\b/.test(out);
      results.set(ex, {
        ok: done && !silentBug,
        out,
        err: silentBug ? 'Error: example printed `undefined`' : done ? '' : r.err,
      });
    });
  }
}
await Promise.all(Array.from({length: CONCURRENCY}, worker));

let failed = 0;
let differs = 0;
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const examples = jobs.filter((j) => j.file === file).flatMap((j) => j.examples);
  if (!examples.length) continue;
  let out = src;
  // Apply edits from the end so earlier offsets stay valid.
  for (const ex of [...examples].sort((a, b) => b.fence.start - a.fence.start)) {
    const r = results.get(ex);
    const rel = path.relative(root, file);
    if (!r.ok) {
      failed++;
      console.error(`✗ ${rel}: ${r.err.split('\n').find((l) => /Error|timed out/.test(l)) ?? r.err.split('\n')[0]}`);
      continue;
    }
    const text = formatOutput(r.out);
    if (ex.output && /title="Output \(varies\)"/.test(ex.output.meta)) continue;
    const current = ex.output ? ex.output.code.replace(/\s+$/, '') : '';
    if (current === text) continue;
    if (!WRITE) {
      differs++;
      continue;
    }
    const block = text ? `\`\`\`text title="Output"\n${text}\n\`\`\`` : '';
    if (ex.output) out = out.slice(0, ex.output.start) + block + out.slice(ex.output.end);
    else if (block) out = out.slice(0, ex.fence.end) + '\n\n' + block + out.slice(ex.fence.end);
  }
  if (WRITE && out !== src) fs.writeFileSync(file, out.replace(/\n{3,}```text title="Output"/g, '\n\n```text title="Output"'));
}

const total = results.size;
console.log(`${total - failed}/${total} examples ran${differs ? `; ${differs} output blocks differ from this run (use --write to refresh)` : ''}.`);
if (failed) process.exit(1);
