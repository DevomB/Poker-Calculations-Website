import {createRequire} from 'node:module';
import {readFileSync, readdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'package.json'));
const pkgMain = require.resolve('poker-calculations');
const indexDtsPath = join(dirname(pkgMain), 'index.d.ts');

const apiRoot = join(root, 'docs/reference/api');

const categories = readdirSync(apiRoot, {withFileTypes: true})
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const docSlugs = new Set();
for (const cat of categories) {
  const dir = join(apiRoot, cat);
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.mdx') && f !== 'index.mdx') {
      docSlugs.add(f.replace(/\.mdx$/, ''));
    }
  }
}

function exportNamesFromIndexDts(dts) {
  const marker = 'export interface PokerCalculations {';
  const start = dts.indexOf(marker);
  if (start < 0) {
    throw new Error('PokerCalculations interface not found in index.d.ts');
  }
  let i = dts.indexOf('{', start) + 1;
  let depth = 1;
  const begin = i;
  while (i < dts.length && depth > 0) {
    const ch = dts[i++];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
  }
  const body = dts.slice(begin, i - 1);
  const names = [...body.matchAll(/^\s{2}([a-zA-Z][a-zA-Z0-9]*)\s*\(/gm)].map((m) => m[1]);
  return [...new Set(names)].sort();
}

const unique = exportNamesFromIndexDts(readFileSync(indexDtsPath, 'utf8'));

function toSlug(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

const missing = [];
/** MDX stub pages for removed exports; not in index.d.ts */
const ALLOWED_EXTRA_DOC_SLUGS = new Set([
  'evaluate-hand-strength-scalar',
  'evaluate-hand-strength-fast-scalar',
]);

const extra = [];
for (const name of unique) {
  const slug = toSlug(name);
  if (!docSlugs.has(slug)) missing.push(name);
}
for (const slug of docSlugs) {
  const expected = unique.find((n) => toSlug(n) === slug);
  if (!expected && !ALLOWED_EXTRA_DOC_SLUGS.has(slug)) extra.push(slug);
}

if (missing.length || extra.length) {
  if (missing.length) {
    console.error('Missing API docs for exports:', missing.join(', '));
  }
  if (extra.length) {
    console.error('Extra doc slugs without export:', extra.join(', '));
  }
  process.exit(1);
}

console.log(`OK: ${unique.length} exports covered by ${docSlugs.size} MDX pages.`);
