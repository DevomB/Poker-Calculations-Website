/**
 * Smoke-test documented calls when native prebuilds are available (local dev / CI with NPM built).
 */
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

let poker;
try {
  poker = require('poker-calculations');
} catch (err) {
  console.warn(
    'validate:snippets skipped — native addon not loadable:',
    err.message?.split('\n')[0] ?? err,
  );
  process.exit(0);
}

const encode = require('poker-calculations/encode');

const tests = [
  () => {
    const h = poker.evaluateBestHand(['Ah', 'Ac', 'Kd', 'Ks', 'Qh']);
    if (!h.rank) throw new Error('evaluateBestHand missing rank');
  },
  () => {
    const eq = poker.simulateHandOutcome(['Ah', 'Kh'], ['Qh', 'Jh', '2c'], 500, 1, 1);
    if (typeof eq !== 'number' || eq < 0 || eq > 1) throw new Error('bad equity');
  },
  () => {
    const po = poker.potOddsRatio(100, 50);
    if (Math.abs(po - 1 / 3) > 1e-9) throw new Error('potOddsRatio');
  },
  () => {
    const spr = poker.spr(90, 270);
    if (spr !== 3) throw new Error('spr');
  },
  () => {
    const icm = poker.icmWinProbabilitiesHarville([4000, 3000, 2000]);
    if (icm.length !== 3) throw new Error('icm length');
  },
  () => {
    const packed = poker.parseCompactCardList('AhKh', {outFormat: 'packed'});
    if (!(packed instanceof Uint8Array) || packed.length !== 2) {
      throw new Error('parseCompactCardList packed');
    }
  },
  () => {
    const p = encode.packCards(['Ah', 'Kh']);
    if (!(p instanceof Uint8Array) || p.length !== 2) throw new Error('encode.packCards');
  },
  () => {
    const pre = poker.exactHuEquityVsRandomHand(['As', 'Ks'], []);
    if (typeof pre !== 'number' || pre < 0 || pre > 1) throw new Error('exactHu preflop');
  },
];

for (const t of tests) {
  t();
}
console.log(`OK: ${tests.length} snippet smoke tests passed.`);
