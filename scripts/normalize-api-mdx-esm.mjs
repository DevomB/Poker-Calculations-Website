/**
 * Normalize API MDX pages:
 * - Inline ESM under Import (no separate ## ESM heading)
 * - Remove irrelevant Packed card input cross-links
 * - Ensure blank lines before ## headings
 */
import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiRoot = join(root, 'docs/reference/api');

const ESM_SECTION =
  /## ESM \(Node\)\r?\n\r?\n```js\r?\nimport \{ createRequire \} from 'module';\r?\nconst require = createRequire\(import\.meta\.url\);\r?\nconst poker = require\('poker-calculations'\);\r?\n```/;

const ESM_INLINE = `ESM (Node):

\`\`\`js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const poker = require('poker-calculations');
\`\`\``;

const PACKED_CARD_LINE =
  /\r?\nSee \[Packed card input\]\([^)]+\)(?: and \[SparseRangeSpec\]\([^)]+\) where those inputs apply\.)?\r?\n/;

let changed = 0;

for (const cat of readdirSync(apiRoot, {withFileTypes: true}).filter((d) => d.isDirectory())) {
  const dir = join(apiRoot, cat.name);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.mdx') || file === 'index.mdx') continue;
    const path = join(dir, file);
    let content = readFileSync(path, 'utf8');
    const original = content;

    if (ESM_SECTION.test(content)) {
      content = content.replace(ESM_SECTION, ESM_INLINE);
    }

    const sigMatch = content.match(/apiSignature[^`]*\{`([^`]+)`\}/);
    const signature = sigMatch?.[1] ?? '';
    if (!/CardInput|SparseRangeSpec/.test(signature) && PACKED_CARD_LINE.test(content)) {
      content = content.replace(PACKED_CARD_LINE, '\n');
    }

    content = content.replace(/([^\n])\n(## )/g, '$1\n\n$2');

    if (content !== original) {
      writeFileSync(path, content);
      changed++;
    }
  }
}

console.log(`normalize-api-mdx-esm: updated ${changed} files`);
