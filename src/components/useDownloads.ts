import {useEffect, useState} from 'react';

// npm's stats API allows browser requests and returns at most 18 months per call.
const START = '2025-01-01';
const CHUNK_DAYS = 540;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function downloadRanges(today = new Date()): Array<[string, string]> {
  const ranges: Array<[string, string]> = [];
  let from = new Date(`${START}T00:00:00Z`);
  while (from <= today) {
    const to = new Date(Math.min(from.getTime() + (CHUNK_DAYS - 1) * 86_400_000, today.getTime()));
    ranges.push([iso(from), iso(to)]);
    from = new Date(to.getTime() + 86_400_000);
  }
  return ranges;
}

export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, '')}k`;
}

/** All-time npm downloads: the build-time number first, then a live count from npm. */
export function useDownloads(initial: number): number {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const ctrl = new AbortController();
    Promise.all(
      downloadRanges().map(([a, b]) =>
        fetch(`https://api.npmjs.org/downloads/point/${a}:${b}/poker-calculations`, {signal: ctrl.signal})
          .then((r) => (r.ok ? r.json() : {downloads: 0}))
          .then((j: {downloads?: number}) => j.downloads ?? 0),
      ),
    )
      .then((parts) => {
        const total = parts.reduce((s, n) => s + n, 0);
        if (total > 0) setCount(total);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return count;
}
