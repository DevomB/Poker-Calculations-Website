/**
 * Generates MDX API pages from NPM/index.d.ts + NPM/FEATURES_ADDED.md.
 * Run from Website/: node scripts/gen-api-docs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.join(__dirname, '..');
const repoRoot = path.join(websiteRoot, '..');
const dtsPath = path.join(repoRoot, 'NPM', 'index.d.ts');
const featuresPath = path.join(repoRoot, 'NPM', 'FEATURES_ADDED.md');
const docsApiRoot = path.join(websiteRoot, 'docs', 'api');

const EXPORT_TO_FOLDER = {
  validateCardString: 'card-strings',
  cardStringsHaveDuplicate: 'card-strings',
  canonicalCardString: 'card-strings',
  parseCompactCardList: 'card-strings',
  evaluateBestHand: 'hand-evaluation',
  evaluateHandStrength: 'hand-evaluation',
  evaluateHandCategory: 'hand-evaluation',
  compareBestHands: 'hand-evaluation',
  handRankCategoryOrder: 'hand-evaluation',
  simulateHandOutcome: 'monte-carlo-equity',
  parallelHandSimulation: 'monte-carlo-equity',
  exactHuEquityVsRandomHand: 'monte-carlo-equity',
  decideAction: 'strategy',
  potOddsRatio: 'pot-chip-ev',
  expectedValueCall: 'pot-chip-ev',
  expectedValueCallWithRake: 'pot-chip-ev',
  breakevenCallEquity: 'pot-chip-ev',
  breakevenCallEquityFromPotOddsDisplayRatio: 'pot-chip-ev',
  potOddsDisplayRatioFromBreakevenCallEquity: 'pot-chip-ev',
  formatPotOddsReducedFraction: 'pot-chip-ev',
  equityToWinningOddsAgainst: 'pot-chip-ev',
  winningOddsAgainstToEquity: 'pot-chip-ev',
  rakeFromPot: 'pot-chip-ev',
  breakevenCallEquityWithRake: 'pot-chip-ev',
  spr: 'stacks-display',
  effectiveStack: 'stacks-display',
  normalizedStackFractions: 'stacks-display',
  stackInBigBlinds: 'stacks-display',
  potOddsRatioDisplay: 'stacks-display',
  formatPotOdds: 'stacks-display',
  harringtonM: 'stacks-display',
  harringtonMEffective: 'stacks-display',
  harringtonMEffectiveActiveAntes: 'stacks-display',
  harringtonQ: 'stacks-display',
  orbitCostChips: 'stacks-display',
  nlMinimumRaiseToTotal: 'stacks-display',
  preflopCombosFromNotation: 'stacks-display',
  preflopCombosFromNotationsList: 'stacks-display',
  minimumDefenseFrequency: 'gto-frequencies',
  alphaFrequency: 'gto-frequencies',
  bluffToValueRatio: 'gto-frequencies',
  valueToBluffRatio: 'gto-frequencies',
  ruleOfFourEquity: 'draw-heuristics',
  ruleOfTwoEquity: 'draw-heuristics',
  estimatedOutsFromRuleOfTwo: 'draw-heuristics',
  estimatedOutsFromRuleOfFour: 'draw-heuristics',
  impliedBreakevenFutureWin: 'draw-heuristics',
  hypergeometricOneCardHitProbability: 'draw-heuristics',
  runnerRunnerBackdoorFlushTwoCardProbability: 'draw-heuristics',
  flopToRiverAtLeastOneHitProbability: 'draw-heuristics',
  flopToRiverAtLeastOneHitUnionTwoCategories: 'draw-heuristics',
  flopToRiverAtLeastOneHitUnionThreeCategories: 'draw-heuristics',
  flopToRiverAtLeastOneHitUnionFourCategories: 'draw-heuristics',
  flopToRiverAtLeastOneHitDisjointOutsSum: 'draw-heuristics',
  runnerRunnerStraightDrawHitProbability: 'draw-heuristics',
  straightMadeFlopToRiverExactProbability: 'draw-heuristics',
  duplicationAdjustedOuts: 'draw-heuristics',
  reverseImpliedOddsMaxFutureLoss: 'reverse-implied-geometry',
  geometricPotAfterMatchedPotFractions: 'reverse-implied-geometry',
  monteCarloStandardError: 'stats-risk',
  monteCarloTrialsForStandardErrorBound: 'stats-risk',
  wilsonScoreInterval: 'stats-risk',
  agrestiCoullInterval: 'stats-risk',
  normalWaldBinomialInterval: 'stats-risk',
  monteCarloTrialsForHoeffdingBound: 'stats-risk',
  riskOfRuinDiffusionApprox: 'stats-risk',
  bankrollForTargetRorDiffusion: 'stats-risk',
  betaBinomialFoldPosterior: 'stats-risk',
  kellyCriterionBinary: 'kelly-jam',
  chubukovSymmetricJamBreakevenStack: 'kelly-jam',
  chubukovSymmetricJamEv: 'kelly-jam',
  chubukovMaxSymmetricJamStackChipsBinarySearch: 'kelly-jam',
  chubukovMaxSymmetricJamStackBinarySearch: 'kelly-jam',
  chubukovMaxSymmetricJamStackFromHandBinarySearch: 'kelly-jam',
  betAsPotFraction: 'sizing-commitment',
  sprAfterCall: 'sizing-commitment',
  commitmentRatio: 'sizing-commitment',
  breakevenFoldEquityPureBluff: 'fold-equity',
  breakevenFoldEquitySemiBluff: 'fold-equity',
  breakevenFoldEquitySemiBluffWithRake: 'fold-equity',
  breakevenFoldEquityPureBluffWithRake: 'fold-equity',
  twoStreetPureBluffSameFoldEquity: 'fold-equity',
  twoStreetPureBluffEv: 'fold-equity',
  breakevenFoldEquitySecondStreetPureBluff: 'fold-equity',
  breakevenFoldEquityFirstStreetPureBluff: 'fold-equity',
  multiwaySymmetricBreakevenCallEquity: 'multiway',
  multiwaySymmetricBreakevenCallEquityWithShare: 'multiway',
  icmWinProbabilitiesHarville: 'icm',
  icmHarvillePlacementProbabilities: 'icm',
  icmTopKFinishProbabilities: 'icm',
  icmLastPlaceProbabilitiesHarville: 'icm',
  icmExpectedPayouts: 'icm',
  icmPairwiseBubbleFactor: 'icm',
  sidePotLadderFromCommitments: 'side-pots',
  layeredPotChipEvFromEquities: 'side-pots',
  sidePotLayersTotalChips: 'side-pots',
};

const CATEGORY_PLAYBOOK = {
  'card-strings':
    'Use these at the boundary of any pipeline that accepts pasted hands, solver exports, or UI text. They keep card identity consistent before you spend CPU on evaluation or simulation.',
  'hand-evaluation':
    'Use these once cards are validated: resolving best five from up to seven, comparing spots, or bucketing into categories for reports. They are deterministic and do not depend on stack or pot.',
  'monte-carlo-equity':
    'Use when you need equity estimates against random or uniform villains—either fast single-threaded sampling or threaded batches, or exact HU numbers on a fixed board.',
  strategy:
    'Use when you want a single rule-based action from a serialized table state (bots, trainers, regression fixtures)—not when you need full GTO solutions.',
  'pot-chip-ev':
    'Use for single-street chip EV and breakeven math around calls, pot odds, rake on the final pot, and book-style odds conversion—ideal for study sheets and post-hand EV checks.',
  'stacks-display':
    'Use for SPR, blinds-relative stack metrics, Harrington M/Q, orbit cost, NL minimum raise toy sizing, and human-readable pot-odds strings—anything that turns chips into ratios for HUDs or notes.',
  'gto-frequencies':
    'Use for toy polarized-river frequency ratios (MDF, alpha, bluff:value) derived from pot geometry only. These are teaching aids, not full equilibrium solvers.',
  'draw-heuristics':
    'Use for quick draw math: rule of 2/4, flop-to-union hit models, runner-runner patterns, duplication heuristics, and exact straight-or-better flop-to-river probabilities when you already modeled outs.',
  'reverse-implied-geometry':
    'Use for toy models of future pot growth or ceilings on how bad implied odds can get when you call with a fixed equity snapshot—supplements, not replacements, for street-by-street sims.',
  'stats-risk':
    'Use when you are quantifying uncertainty or risk around estimates: MC standard errors, confidence intervals, Hoeffding trial counts, diffusion-style risk of ruin, or Beta updates on observed folds.',
  'kelly-jam':
    'Use for bankroll sizing (Kelly) and symmetric jam toy models (Chubukov-style stacks and EV). Pair chip-search exports with exact equity when the board is fixed.',
  'sizing-commitment':
    'Use to express bets as pot fractions, SPR after a single HU call, or how much of the effective stack a call consumes—common in commitment and stack-depth discussions.',
  'fold-equity':
    'Use when you are sizing bluffs or semi-bluffs and need breakeven fold equity, optionally with rake or across two streets with independent fold assumptions.',
  multiway:
    'Use for symmetric extra callers in a pot-geometry breakeven model—useful classroom multiway intuition, not full combinatorial multiway equity.',
  icm:
    'Use for tournament payout math with Harville-style placement weights: first-place shares, placement matrices, expected payouts, and bubble pressure between two seats.',
  'side-pots':
    'Use after you know each player’s committed chips for the hand: build side-pot layers, sum chip EV across layers from per-layer equities, or total chips across layers.',
};

const EXAMPLE_HINT = {
  evaluateBestHand: 'hand-resolution.mjs',
  compareBestHands: 'hand-resolution.mjs',
  validateCardString: 'hand-resolution.mjs',
  simulateHandOutcome: 'monte-carlo-equity.mjs',
  parallelHandSimulation: 'monte-carlo-equity.mjs',
  exactHuEquityVsRandomHand: 'monte-carlo-equity.mjs',
  decideAction: 'strategy-decide-action.mjs',
  potOddsRatio: 'pot-chip-ev-rake.mjs',
  expectedValueCall: 'pot-chip-ev-rake.mjs',
  breakevenCallEquityWithRake: 'pot-chip-ev-rake.mjs',
  icmWinProbabilitiesHarville: 'icm.mjs',
  sidePotLadderFromCommitments: 'side-pots.mjs',
  breakevenFoldEquityPureBluff: 'fold-equity.mjs',
  minimumDefenseFrequency: 'gto-frequency.mjs',
  multiwaySymmetricBreakevenCallEquity: 'multiway.mjs',
  kellyCriterionBinary: 'kelly-chubukov-jam.mjs',
  chubukovMaxSymmetricJamStackBinarySearch: 'kelly-chubukov-jam.mjs',
  wilsonScoreInterval: 'stats-risk.mjs',
  harringtonM: 'stacks-display.mjs',
  spr: 'stacks-display.mjs',
  runnerRunnerBackdoorFlushTwoCardProbability: 'heuristics-draws.mjs',
  straightMadeFlopToRiverExactProbability: 'heuristics-draws.mjs',
  reverseImpliedOddsMaxFutureLoss: 'reverse-implied-geometry.mjs',
  geometricPotAfterMatchedPotFractions: 'reverse-implied-geometry.mjs',
  monteCarloStandardError: 'stats-risk.mjs',
  monteCarloTrialsForHoeffdingBound: 'stats-risk.mjs',
  betAsPotFraction: 'sizing-commitment.mjs',
  sprAfterCall: 'sizing-commitment.mjs',
  commitmentRatio: 'sizing-commitment.mjs',
};

function camelToKebab(name) {
  return name
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function parseRolesFromFeatures(md) {
  const roles = {};
  for (const line of md.split('\n')) {
    const m = line.match(/\|\s*\|\s*`([a-zA-Z][a-zA-Z0-9]*)/);
    if (!m) continue;
    const name = m[1];
    const pipeParts = line.split('|');
    const lastCol = pipeParts[pipeParts.length - 2]?.trim();
    if (lastCol) roles[name] = lastCol;
  }
  return roles;
}

function extractJsdocAndSignature(dts, name) {
  const needle = `  ${name}(`;
  const idx = dts.indexOf(needle);
  if (idx === -1) throw new Error(`Missing method ${name} in index.d.ts`);
  const before = dts.slice(0, idx).replace(/\s+$/, '');
  const jsdocMatch = before.match(/(\/\*\*[\s\S]*?\*\/)\s*$/);
  const jsdoc = jsdocMatch ? jsdocMatch[1] : '';
  let i = idx + needle.length - 1; // at '('
  let depth = 0;
  const start = idx;
  for (; i < dts.length; i++) {
    const c = dts[i];
    if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const tail = dts.slice(i);
  const retMatch = tail.match(/^\s*:\s*([^;]+);/);
  if (!retMatch) throw new Error(`No return for ${name}`);
  const sigBody = dts.slice(start, i).trim();
  const ret = retMatch[1].trim();
  const signatureTs = `${sigBody}: ${ret};`;
  return { jsdoc, signatureTs };
}

function jsdocToMarkdown(jsdoc) {
  if (!jsdoc) return '_See TypeScript types in the repository._';
  const inner = jsdoc
    .replace(/^\/\*\*\s*/, '')
    .replace(/\s*\*\/$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\* ?/, '').trim())
    .filter(Boolean)
    .join('\n\n');
  return inner;
}

function buildWhenToUse(name, folder, role) {
  const playbook = CATEGORY_PLAYBOOK[folder] || '';
  const roleText = role || 'See the summary below.';
  return `${playbook}\n\n**Concrete trigger:** ${roleText}\n\n**Skip this export** when you need full multi-street game trees, opponent-specific ranges, or browser-side execution without the native addon—this library is Node + N-API.`;
}

/** YAML front matter must be valid YAML; role text often contains `:`, backticks, etc. */
function yamlDescriptionField(s) {
  const t = String(s || 'API export')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 280);
  return JSON.stringify(t);
}

function main() {
  const dts = fs.readFileSync(dtsPath, 'utf8');
  const features = fs.readFileSync(featuresPath, 'utf8');
  const roles = parseRolesFromFeatures(features);
  const names = Object.keys(EXPORT_TO_FOLDER);
  if (names.length !== 96) {
    throw new Error(`Expected 96 exports, got ${names.length}`);
  }

  const ghBase =
    'https://github.com/DevomB/Poker-Calculations/blob/main/NPM/examples/';

  for (const name of names) {
    const folder = EXPORT_TO_FOLDER[name];
    const { jsdoc, signatureTs } = extractJsdocAndSignature(dts, name);
    const roleRaw = roles[name];
    const role = roleRaw
      ? roleRaw
          .replace(/\[Hand rank labels\]\(#hand-rank-labels\)/g, '[Hand rank labels](/docs/intro#hand-rank-labels)')
          .replace(/\(#hand-rank-labels\)/g, '(/docs/intro#hand-rank-labels)')
      : roleRaw;
    const kebab = camelToKebab(name);
    const dir = path.join(docsApiRoot, folder);
    fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, `${kebab}.mdx`);
    const implMd = jsdocToMarkdown(jsdoc);
    const when = buildWhenToUse(name, folder, role);
    const exampleFile = EXAMPLE_HINT[name];
    const exampleSection = exampleFile
      ? `Runnable sample in the repo: [NPM/examples/${exampleFile}](${ghBase}${exampleFile}).`
      : `Browse grouped samples under [\`NPM/examples/\`](https://github.com/DevomB/Poker-Calculations/tree/main/NPM/examples).`;

    const body = `---
title: ${name}
sidebar_label: ${name}
description: ${yamlDescriptionField(role || name)}
---

## Summary

${role || `Native export \`${name}\` from the \`poker-calculations\` addon.`}

## Signature

\`\`\`ts
${signatureTs}
\`\`\`

## Implementation notes

\`\`\`text
${implMd.replace(/```/g, '\\`\\`\\`')}
\`\`\`

## When to use

${when}

## Example

\`\`\`js
const poker = require('poker-calculations');
// ${name}(...) — see signature above
\`\`\`

${exampleSection}

## See also

- [API index](/docs/api)
- Type definitions: [\`NPM/index.d.ts\`](https://github.com/DevomB/Poker-Calculations/blob/main/NPM/index.d.ts)
`;
    fs.writeFileSync(outPath, body, 'utf8');
  }

  fs.writeFileSync(
    path.join(docsApiRoot, '_category_.json'),
    JSON.stringify(
      {
        label: 'API reference',
        position: 2,
        link: { type: 'doc', id: 'api/index' },
      },
      null,
      2
    ),
    'utf8'
  );

  const categoryMeta = [
    ['card-strings', 'Card strings', 1],
    ['hand-evaluation', 'Hand evaluation', 2],
    ['monte-carlo-equity', 'Monte Carlo & exact equity', 3],
    ['strategy', 'Strategy', 4],
    ['pot-chip-ev', 'Pot odds & chip EV', 5],
    ['stacks-display', 'Stacks & display', 6],
    ['gto-frequencies', 'GTO-style frequencies (toy)', 7],
    ['draw-heuristics', 'Draw heuristics', 8],
    ['reverse-implied-geometry', 'Reverse implied & geometry', 9],
    ['stats-risk', 'Statistics & risk', 10],
    ['kelly-jam', 'Kelly & jam toys', 11],
    ['sizing-commitment', 'Sizing & commitment', 12],
    ['fold-equity', 'Fold equity', 13],
    ['multiway', 'Multiway', 14],
    ['icm', 'ICM', 15],
    ['side-pots', 'Side pots', 16],
  ];

  for (const [folder, label, position] of categoryMeta) {
    const catPath = path.join(docsApiRoot, folder, '_category_.json');
    fs.mkdirSync(path.dirname(catPath), { recursive: true });
    fs.writeFileSync(
      catPath,
      JSON.stringify(
        {
          label,
          position,
          link: {
            type: 'generated-index',
            description: `Exports in the ${label} group.`,
          },
        },
        null,
        2
      ),
      'utf8'
    );
  }

  const sorted = [...names].sort();
  const byLetter = {};
  for (const n of sorted) {
    const L = n[0].toUpperCase();
    if (!byLetter[L]) byLetter[L] = [];
    byLetter[L].push(n);
  }
  let indexBody = `---
title: API reference
sidebar_position: 0
description: All 96 N-API exports of poker-calculations
---

Complete reference for every JavaScript export on [\`poker-calculations\`](https://www.npmjs.com/package/poker-calculations) (Node 18+, N-API). Implementation lives in C++; types and JSDoc live in [\`NPM/index.d.ts\`](https://github.com/DevomB/Poker-Calculations/blob/main/NPM/index.d.ts).

## By category

Browse the sidebar or jump into a category index page.

## Alphabetical index (96)

`;
  for (const letter of Object.keys(byLetter).sort()) {
    indexBody += `### ${letter}\n\n`;
    for (const n of byLetter[letter]) {
      const f = EXPORT_TO_FOLDER[n];
      const slug = camelToKebab(n);
      indexBody += `- [\`${n}\`](/docs/api/${f}/${slug})\n`;
    }
    indexBody += '\n';
  }
  fs.writeFileSync(path.join(docsApiRoot, 'index.mdx'), indexBody, 'utf8');

  console.log(`Wrote ${names.length} API pages under docs/api/`);
}

main();