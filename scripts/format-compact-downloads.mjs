/**
 * Format a download count to 2 significant figures with k/M/B/T suffix.
 * @param {number} value
 * @returns {string}
 */
export function formatCompactDownloads(value) {
  if (!Number.isFinite(value) || value < 0) return '—';
  if (value < 1000) return String(Math.round(value));
  const units = ['', 'k', 'M', 'B', 'T'];
  const tier = Math.min(Math.floor(Math.log10(value) / 3), units.length - 1);
  const scaled = value / 10 ** (tier * 3);
  const rounded = Number(scaled.toPrecision(2));
  return `${rounded}${units[tier]}`;
}
