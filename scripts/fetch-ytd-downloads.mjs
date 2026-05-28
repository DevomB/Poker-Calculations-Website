import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {formatCompactDownloads} from './lib/formatCompactDownloads.mjs';

const PACKAGE = 'poker-calculations';
const START = '2026-01-01';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = join(root, 'src/data/downloads.json');

const FALLBACK = {
  formatted: '1.6k',
  raw: 1600,
  start: START,
  end: START,
  fetchedAt: '1970-01-01T00:00:00.000Z',
};

function yesterdayUtcYmd() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * @param {{formatted: string; raw: number; start: string; end: string; fetchedAt: string}} data
 */
function writeDownloads(data) {
  mkdirSync(dirname(OUT_FILE), {recursive: true});
  writeFileSync(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

/**
 * @returns {Promise<{formatted: string; raw: number; start: string; end: string; fetchedAt: string}>}
 */
async function fetchYtdDownloads() {
  const end = yesterdayUtcYmd();
  if (end < START) {
    throw new Error(`invalid range: end ${end} is before start ${START}`);
  }
  const url = `https://api.npmjs.org/downloads/range/${START}:${end}/${PACKAGE}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`npm downloads API ${res.status}`);
  }
  const body = await res.json();
  if (!Array.isArray(body?.downloads)) {
    throw new Error('unexpected npm API shape');
  }
  const raw = body.downloads.reduce((sum, day) => sum + day.downloads, 0);
  return {
    formatted: formatCompactDownloads(raw),
    raw,
    start: START,
    end,
    fetchedAt: new Date().toISOString(),
  };
}

function handleFailure(reason) {
  console.warn(`fetch-ytd-downloads: ${reason}`);
  if (existsSync(OUT_FILE)) {
    console.warn('fetch-ytd-downloads: keeping existing downloads.json');
    return;
  }
  const end = yesterdayUtcYmd();
  writeDownloads({
    ...FALLBACK,
    end: end >= START ? end : START,
    fetchedAt: new Date().toISOString(),
  });
  console.warn('fetch-ytd-downloads: wrote safe fallback to downloads.json');
}

try {
  const data = await fetchYtdDownloads();
  writeDownloads(data);
  console.log(`npm downloads: ${data.formatted} (${data.raw}) ${data.start}..${data.end}`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  handleFailure(message);
}

process.exit(0);
