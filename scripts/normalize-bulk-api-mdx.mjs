/**
 * Normalizer for API MDX pages:
 * - Inline ESM under Import
 * - Remove irrelevant Packed card input cross-links (signature-based)
 * - Fix See also separators
 * - Ensure blank lines before ## headings
 * - Convert apiSignature <code> blocks to template literals
 */
import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiRoot = join(root, 'docs/reference/api');

const ESM_BLOCK =
  /\n## ESM \(Node\)\n+```js\nimport \{ createRequire \} from 'module';\nconst require = createRequire\(import\.meta\.url\);\nconst poker = require\('poker-calculations'\);\n```/g;

const ESM_INLINE = `\n\nESM (Node):\n\n\`\`\`js\nimport { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\nconst poker = require('poker-calculations');\n\`\`\``;

const PACKED_CARD_LINE =
  /\nSee \[Packed card input\]\([^)]+\)( and \[SparseRangeSpec\]\([^)]+\) where those inputs apply\.)?\n/;

let changed = 0;

for (const cat of readdirSync(apiRoot, {withFileTypes: true}).filter((d) => d.isDirectory())) {
  const dir = join(apiRoot, cat.name);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.mdx') || file === 'index.mdx') continue;
    const path = join(dir, file);
    let content = readFileSync(path, 'utf8');
    const original = content;

    content = content.replace(
      /<div className="apiSignature"><code>([^<]*)<\/code><\/div>/g,
      '<div className="apiSignature">{`$1`}</div>',
    );

    content = content.replace(ESM_BLOCK, ESM_INLINE);

    const sig = content.match(/apiSignature">\{`([^`]+)`\}/)?.[1] ?? '';
    if (
      !/CardInput|SparseRangeSpec/.test(sig) &&
      PACKED_CARD_LINE.test(content)
    ) {
      content = content.replace(PACKED_CARD_LINE, '\n');
    }

    content = content.replace(/## See also\n([\s\S]*?)(?=\n## |\n*$)/m, (block) => {
      const body = block.replace(/^## See also\n/, '');
      const fixed = body.replace(/\s+-\s+/g, ' · ');
      return `## See also\n${fixed}`;
    });

    content = content.replace(/([^\n])\n(## )/g, '$1\n\n$2');

    if (content !== original) {
      writeFileSync(path, content);
      changed++;
    }
  }
}

console.log(`normalize-bulk-api-mdx: updated ${changed} files`);
