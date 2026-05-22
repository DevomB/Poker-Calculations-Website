import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
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

const bindingPath = join(root, '../NPM/native/binding.cpp');
const binding = readFileSync(bindingPath, 'utf8');
const exportNames = [
  ...binding.matchAll(/exports\.Set\(Napi::String::New\(env,\s*"([^"]+)"/g),
].map((m) => m[1]);
const unique = [...new Set(exportNames)].sort();

function toSlug(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

const missing = [];
const extra = [];
for (const name of unique) {
  const slug = toSlug(name);
  if (!docSlugs.has(slug)) missing.push(name);
}
for (const slug of docSlugs) {
  const expected = unique.find((n) => toSlug(n) === slug);
  if (!expected) extra.push(slug);
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
