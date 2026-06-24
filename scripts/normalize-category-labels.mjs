/**
 * Apply deliberate Title Case to API category labels (sidebar, _category_.json,
 * index frontmatter, homepage grid). Acronyms (API, EV, ICM, GTO) stay uppercase.
 */
import {readFileSync, writeFileSync, readdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Short nav label — sidebars.ts, _category_.json, api-reference.ts */
const SIDEBAR_LABELS = {
  'hands-and-equity': 'Hands & Equity',
  'monte-carlo': 'Monte Carlo',
  strategy: 'Strategy',
  'pot-and-ev': 'Pot & EV',
  'stacks-and-display': 'Stacks & Display',
  'heuristics-and-draws': 'Heuristics & Draws',
  'reverse-implied': 'Reverse Implied',
  'statistics-and-risk': 'Statistics & Risk',
  'kelly-and-jam': 'Kelly & Jam',
  'gto-frequencies': 'GTO Frequencies',
  'sizing-and-commitment': 'Sizing & Commitment',
  'fold-equity': 'Fold Equity',
  multiway: 'Multiway',
  icm: 'ICM',
  'side-pots': 'Side Pots',
  'cooperative-icm': 'Tournament ICM',
  'combinatorics-exact': 'Exact Runouts',
  'subgame-theory': 'Subgame & Ranges',
  'range-tools': 'Range Tools',
  'board-texture': 'Board Texture',
  'opponent-modeling': 'Opponent Modeling',
};

/** Page title on category index.mdx (may be more descriptive than sidebar). */
const INDEX_TITLES = {
  ...SIDEBAR_LABELS,
  'reverse-implied': 'Reverse Implied & Geometry',
  'kelly-and-jam': 'Kelly & Jam Toys',
  'gto-frequencies': 'GTO-Style Frequencies',
};

function parseFrontmatter(content) {
  const normalized = content.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) return null;
  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) return null;
  return {
    fields: normalized.slice(4, end),
    body: normalized.slice(end + 5),
  };
}

function setTitleField(fieldsBlock, title) {
  const quoted =
    /[&]/.test(title) || title.includes('-') || /\s/.test(title)
      ? `'${title.replace(/'/g, "''")}'`
      : title;
  const lines = fieldsBlock.split('\n').filter((l) => !l.startsWith('title:'));
  return [`title: ${quoted}`, ...lines].join('\n');
}

function replaceIndexH1(body, title) {
  return body.replace(/^# [^\n]+\n/, `# ${title}\n`);
}

let updated = 0;

for (const [dir, label] of Object.entries(SIDEBAR_LABELS)) {
  const catJson = join(root, `docs/reference/api/${dir}/_category_.json`);
  try {
    const json = JSON.parse(readFileSync(catJson, 'utf8'));
    if (json.label !== label) {
      json.label = label;
      writeFileSync(catJson, `${JSON.stringify(json, null, 2)}\n`);
      updated++;
    }
  } catch {
    /* no _category_.json */
  }

  const indexPath = join(root, `docs/reference/api/${dir}/index.mdx`);
  const pageTitle = INDEX_TITLES[dir];
  const parsed = parseFrontmatter(readFileSync(indexPath, 'utf8'));
  if (parsed) {
    const nextFields = setTitleField(parsed.fields, pageTitle);
    const nextBody = replaceIndexH1(parsed.body, pageTitle);
    const next = `---\n${nextFields}\n---\n${nextBody}`;
    const prev = readFileSync(indexPath, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    if (next !== prev) {
      writeFileSync(indexPath, next);
      updated++;
    }
  }
}

const apiIndexPath = join(root, 'docs/reference/api/index.mdx');
{
  const parsed = parseFrontmatter(readFileSync(apiIndexPath, 'utf8'));
  if (parsed) {
    const title = 'API Overview';
    const nextFields = setTitleField(parsed.fields, title);
    const nextBody = replaceIndexH1(parsed.body, title);
    writeFileSync(apiIndexPath, `---\n${nextFields}\n---\n${nextBody}`);
    updated++;
  }
}

const typesIndexPath = join(root, 'docs/reference/types/index.mdx');
{
  const parsed = parseFrontmatter(readFileSync(typesIndexPath, 'utf8'));
  if (parsed) {
    const nextFields = setTitleField(parsed.fields, 'Types Overview');
    writeFileSync(typesIndexPath, `---\n${nextFields}\n---\n${parsed.body}`);
    updated++;
  }
}

const apiRefPath = join(root, 'src/data/api-reference.ts');
let apiRef = readFileSync(apiRefPath, 'utf8');
for (const [dir, label] of Object.entries(SIDEBAR_LABELS)) {
  const re = new RegExp(
    `(to: '/docs/reference/api/${dir.replace(/-/g, '\\-')}', count: \\d+, suit: '[^']+',?\\n)|title: '[^']*', to: '/docs/reference/api/${dir.replace(/-/g, '\\-')}'`,
  );
  apiRef = apiRef.replace(
    new RegExp(`title: '[^']*', to: '/docs/reference/api/${dir}'`),
    `title: '${label}', to: '/docs/reference/api/${dir}'`,
  );
}
writeFileSync(apiRefPath, apiRef);

console.log(`normalize-category-labels: touched ${updated} files (+ api-reference.ts)`);
