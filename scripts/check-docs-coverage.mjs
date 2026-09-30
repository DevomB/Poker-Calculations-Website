/**
 * The API reference must match the installed poker-calculations exactly:
 *   - every export in index.d.ts is listed once in src/data/api-families.json, and nothing else is
 *   - every family and category has its page, and there are no stray API pages
 *   - every function has a `## \`name\` \{#name\}` section on its family page
 *   - every signature block equals the declaration(s) in index.d.ts
 * Run: pnpm check:docs
 */
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const dtsPath = path.join(path.dirname(require.resolve('poker-calculations')), 'index.d.ts');
const dts = fs.readFileSync(dtsPath, 'utf8').replace(/\r\n/g, '\n');
const families = JSON.parse(fs.readFileSync(path.join(root, 'src/data/api-families.json'), 'utf8'));
const apiDir = path.join(root, 'docs/reference/api');
const errors = [];

// Declarations per export, overloads included, dedented as the pages show them.
function declarations() {
  const start = dts.indexOf('export interface PokerCalculations');
  let i = dts.indexOf('{', start) + 1;
  let depth = 1;
  const begin = i;
  while (i < dts.length && depth > 0) {
    if (dts[i] === '{') depth++;
    else if (dts[i] === '}') depth--;
    i++;
  }
  const lines = dts.slice(begin, i - 1).split('\n');
  const map = new Map();
  for (let k = 0; k < lines.length; k++) {
    const m = lines[k].match(/^ {2}([A-Za-z_]\w*)\s*[(<]/);
    if (!m) continue;
    let decl = '';
    let open = 0;
    let started = false;
    for (; k < lines.length; k++) {
      decl += (decl ? '\n' : '') + lines[k].replace(/^ {2}/, '');
      for (const ch of lines[k]) {
        if (ch === '(') {
          open++;
          started = true;
        } else if (ch === ')') open--;
      }
      if (started && open === 0 && /;\s*$/.test(lines[k])) break;
    }
    map.set(m[1], [...(map.get(m[1]) ?? []), decl]);
  }
  return map;
}

const decls = declarations();
const listed = new Map();
const expectedFiles = new Set();
for (const section of families.sections) {
  for (const cat of section.categories) {
    expectedFiles.add(`${cat.slug}/index.mdx`);
    for (const fam of cat.families) {
      const rel = `${cat.slug}/${fam.slug}.mdx`;
      expectedFiles.add(rel);
      const file = path.join(apiDir, rel);
      const page = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : null;
      if (!page) errors.push(`missing page ${rel}`);
      for (const fn of fam.functions) {
        listed.set(fn, (listed.get(fn) ?? 0) + 1);
        if (!page) continue;
        // Heading IDs use the MDX-safe escaped form: ## `name` \{#name\}
        const heading = `## \`${fn}\` \\{#${fn}\\}`;
        const at = page.indexOf(heading);
        if (at < 0) {
          errors.push(`${rel}: no section for ${fn}`);
          continue;
        }
        const sig = page.slice(at).match(/```ts\n([\s\S]*?)\n```/);
        const want = (decls.get(fn) ?? []).join('\n');
        if (want && (!sig || sig[1] !== want)) errors.push(`${rel}: signature of ${fn} differs from index.d.ts`);
      }
    }
  }
}

for (const fn of decls.keys()) if (!listed.has(fn)) errors.push(`export ${fn} is not on any API page`);
for (const [fn, n] of listed) {
  if (!decls.has(fn)) errors.push(`${fn} is documented but not exported`);
  if (n > 1) errors.push(`${fn} is listed ${n} times`);
}

for (const dir of fs.readdirSync(apiDir, {withFileTypes: true})) {
  if (!dir.isDirectory()) continue;
  for (const f of fs.readdirSync(path.join(apiDir, dir.name))) {
    if (f.endsWith('.mdx') && !expectedFiles.has(`${dir.name}/${f}`)) errors.push(`stray page ${dir.name}/${f}`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log(`OK: ${decls.size} exports on ${expectedFiles.size - families.sections.flatMap((s) => s.categories).length} pages; signatures match ${path.relative(root, dtsPath)}.`);
