/**
 * Warn when API MDX apiSignature blocks may omit optional params vs index.d.ts.
 * Non-fatal (exit 0); run after check:docs.
 */
import {createRequire} from 'node:module';
import {readFileSync, readdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'package.json'));
const indexDts = readFileSync(
  join(dirname(require.resolve('poker-calculations')), 'index.d.ts'),
  'utf8',
);

function exportSignatures(dts) {
  const marker = 'export interface PokerCalculations {';
  const start = dts.indexOf(marker);
  const open = dts.indexOf('{', start) + 1;
  let depth = 1;
  let i = open;
  while (i < dts.length && depth > 0) {
    const ch = dts[i++];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
  }
  const body = dts.slice(open, i - 1);
  const map = new Map();
  const re = /^\s{2}([a-zA-Z][a-zA-Z0-9]*)\s*\(([^)]*)\)/gm;
  let m;
  while ((m = re.exec(body))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

function toSlug(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

function extractApiSignature(mdx) {
  const match = mdx.match(/<div className="apiSignature">\{`([^`]+)`\}<\/div>/);
  return match?.[1] ?? null;
}

const sigs = exportSignatures(indexDts);
const apiRoot = join(root, 'docs/reference/api');
const warnings = [];

for (const cat of readdirSync(apiRoot, {withFileTypes: true}).filter((d) => d.isDirectory())) {
  const dir = join(apiRoot, cat.name);
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.mdx') || f === 'index.mdx') continue;
    const mdx = readFileSync(join(dir, f), 'utf8');
    const block = extractApiSignature(mdx);
    if (!block) continue;
    const slug = f.replace(/\.mdx$/, '');
    const name = [...sigs.keys()].find((n) => toSlug(n) === slug);
    if (!name) continue;
    const dtsParams = sigs.get(name);
    if (!dtsParams) continue;
    const optionalInDts = (dtsParams.match(/\?/g) ?? []).length;
    const optionalInMdx = (block.match(/\?/g) ?? []).length;
    if (optionalInDts > optionalInMdx) {
      warnings.push(`${cat.name}/${f}: ${name} — index.d.ts has more optional params than apiSignature`);
    }
  }
}

if (warnings.length) {
  console.warn('lint:api-signatures warnings:\n' + warnings.map((w) => `  - ${w}`).join('\n'));
} else {
  console.log('OK: no obvious apiSignature optional-param gaps.');
}
