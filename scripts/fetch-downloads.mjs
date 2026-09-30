/**
 * All-time npm downloads for the homepage, fetched at build time. The page also refreshes
 * the number in the browser, so this is only the first paint and the no-JS fallback.
 * Never fails the build: on error it keeps the committed src/data/downloads.json.
 */
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const PACKAGE = 'poker-calculations';
const START = '2025-01-01'; // before the first publish
const CHUNK_DAYS = 540; // the point API serves at most 18 months per request

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = join(root, 'src/data/downloads.json');
const iso = (d) => d.toISOString().slice(0, 10);

function ranges(today = new Date()) {
  const out = [];
  let from = new Date(`${START}T00:00:00Z`);
  while (from <= today) {
    const to = new Date(Math.min(from.getTime() + (CHUNK_DAYS - 1) * 86_400_000, today.getTime()));
    out.push([iso(from), iso(to)]);
    from = new Date(to.getTime() + 86_400_000);
  }
  return out;
}

try {
  let total = 0;
  for (const [a, b] of ranges()) {
    const res = await fetch(`https://api.npmjs.org/downloads/point/${a}:${b}/${PACKAGE}`);
    if (!res.ok) throw new Error(`npm downloads API ${res.status}`);
    total += (await res.json()).downloads ?? 0;
  }
  if (total <= 0) throw new Error('npm returned zero downloads');
  mkdirSync(dirname(OUT_FILE), {recursive: true});
  writeFileSync(OUT_FILE, `${JSON.stringify({total, since: START, fetchedAt: new Date().toISOString()}, null, 2)}\n`);
  console.log(`npm downloads since ${START}: ${total}`);
} catch (err) {
  console.warn(`fetch-downloads: ${err instanceof Error ? err.message : err}; keeping the committed number`);
}
