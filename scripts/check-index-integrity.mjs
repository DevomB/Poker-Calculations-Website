/**
 * Index page integrity: no corruption patterns; maintained category indexes match export counts.
 */
import {readFileSync, readdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiRefSrc = readFileSync(join(root, 'src/data/api-reference.ts'), 'utf8');
const docsRoot = join(root, 'docs');

/** Category indexes expected to list every export in a summary table. */
const FULL_TABLE_CATEGORIES = new Set([
  'range-tools',
  'board-texture',
  'opponent-modeling',
  'strategy',
  'combinatorics-exact',
  'sizing-and-commitment',
  'subgame-theory',
]);

function parseApiRefCounts(src) {
  const counts = {};
  const re = /to: '\/docs\/reference\/api\/([^']+)', count: (\d+)/g;
  let m;
  while ((m = re.exec(src))) {
    counts[m[1]] = Number(m[2]);
  }
  return counts;
}

const refCounts = parseApiRefCounts(apiRefSrc);
const corruptionPatterns = [
  /System\.Collections\.Hashtable/,
  /â€/,
  /Â·/,
  /â†/,
  /â‰/,
];

function walkMdx(dir, files = []) {
  for (const ent of readdirSync(dir, {withFileTypes: true})) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkMdx(p, files);
    else if (ent.name.endsWith('.mdx')) files.push(p);
  }
  return files;
}

const errors = [];

for (const file of walkMdx(docsRoot)) {
  const content = readFileSync(file, 'utf8');
  for (const pat of corruptionPatterns) {
    if (pat.test(content)) {
      errors.push(`${file.replace(root + '/', '')}: matches ${pat}`);
    }
  }
}

const apiRoot = join(docsRoot, 'reference/api');
for (const cat of FULL_TABLE_CATEGORIES) {
  const indexPath = join(apiRoot, cat, 'index.mdx');
  const content = readFileSync(indexPath, 'utf8');
  const rowMatches = content.match(/\| \[`[^\]]+`\]\(/g) ?? [];
  const expected = refCounts[cat];
  if (expected !== undefined && rowMatches.length !== expected) {
    errors.push(
      `reference/api/${cat}/index.mdx: ${rowMatches.length} table rows, expected ${expected}`,
    );
  }
}

if (errors.length) {
  console.error('check:index-integrity FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log('OK: no doc corruption; full-table category indexes match api-reference.ts.');
