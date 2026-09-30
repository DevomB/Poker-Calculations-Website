/**
 * Exact equities for the homepage "run it out" table, street by street.
 * Writes src/data/hero-hands.json. Run: pnpm build:hero-hands
 */
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const poker = require('poker-calculations');

const SPOTS = [
  {
    title: 'The flip',
    hero: ['As', 'Ks'],
    villain: ['Qh', 'Qd'],
    board: ['7s', '2s', 'Kd', 'Qc', 'Ts'],
  },
  {
    title: 'Cooler',
    hero: ['Kh', 'Kc'],
    villain: ['Ad', 'Ac'],
    board: ['Kd', '8s', '3h', 'Ah', '8c'],
  },
  {
    title: 'The draw',
    hero: ['9h', '8h'],
    villain: ['Ac', 'Qd'],
    board: ['Th', '7c', 'Qh', '2s', '6d'],
  },
];

const STREETS = [
  {name: 'Preflop', cards: 0},
  {name: 'Flop', cards: 3},
  {name: 'Turn', cards: 4},
  {name: 'River', cards: 5},
];

const out = SPOTS.map((spot) => ({
  ...spot,
  streets: STREETS.map(({name, cards}) => {
    const board = spot.board.slice(0, cards);
    const equity = poker.exactHuEquityVsKnownHand(spot.hero, spot.villain, board);
    const heroHand = cards >= 3 ? poker.evaluateBestHand([...spot.hero, ...board]).rank : null;
    const villainHand = cards >= 3 ? poker.evaluateBestHand([...spot.villain, ...board]).rank : null;
    return {name, cards, equity: Math.round(equity * 10000) / 10000, heroHand, villainHand};
  }),
}));

const target = path.join(root, 'src/data/hero-hands.json');
fs.writeFileSync(target, JSON.stringify({generatedWith: 'exactHuEquityVsKnownHand', spots: out}, null, 2) + '\n');
for (const s of out) console.log(s.title.padEnd(10), s.streets.map((x) => `${x.name} ${(x.equity * 100).toFixed(1)}%`).join('  '));
