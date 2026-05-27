import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const pages = [
  {
    cat: 'monte-carlo',
    slug: 'simulate-hand-outcome-async',
    title: 'simulateHandOutcomeAsync',
    pos: 5,
    sig: 'simulateHandOutcomeAsync(holeCards: CardInput, board: CardInput, numSimulations: number, seed: number, villains?: number): Promise<number>',
    when: 'Same as [`simulateHandOutcome`](./simulate-hand-outcome), but the work runs on the libuv thread pool so your event loop stays responsive—HTTP servers, Electron, and batch UIs.',
    how: `const equity = await poker.simulateHandOutcomeAsync(['Ah', 'Kh'], ['Qh', 'Jh', '2c'], 8000, 42, 1);`,
    see: '[`simulateHandOutcome`](./simulate-hand-outcome) · [Monte Carlo equity guide](/docs/guides/monte-carlo-equity)',
  },
  {
    cat: 'monte-carlo',
    slug: 'parallel-hand-simulation-async',
    title: 'parallelHandSimulationAsync',
    pos: 6,
    sig: 'parallelHandSimulationAsync(holeCards: CardInput, board: CardInput, numSimulations: number, baseSeed: number, villains: number, numThreads: number): Promise<number>',
    when: 'Non-blocking version of [`parallelHandSimulation`](./parallel-hand-simulation).',
    how: `const eq = await poker.parallelHandSimulationAsync(hole, board, 20_000, 99, 1, 4);`,
    see: '[`parallelHandSimulation`](./parallel-hand-simulation)',
  },
  {
    cat: 'monte-carlo',
    slug: 'exact-hu-equity-vs-random-hand-async',
    title: 'exactHuEquityVsRandomHandAsync',
    pos: 7,
    sig: 'exactHuEquityVsRandomHandAsync(heroHoleCards: CardInput, boardCards: CardInput): Promise<number>',
    when: 'Async exact HU equity when enumeration would block the main thread.',
    how: `const eq = await poker.exactHuEquityVsRandomHandAsync(['Ah', 'Kd'], ['Qh', 'Jc', '2s']);`,
    see: '[`exactHuEquityVsRandomHand`](./exact-hu-equity-vs-random-hand)',
  },
  {
    cat: 'monte-carlo',
    slug: 'straight-made-flop-to-river-exact-probability-async',
    title: 'straightMadeFlopToRiverExactProbabilityAsync',
    pos: 8,
    sig: 'straightMadeFlopToRiverExactProbabilityAsync(heroHoleCards: CardInput, flopThree: CardInput, knownDead: CardInput): Promise<number>',
    when: 'Async sibling of [`straightMadeFlopToRiverExactProbability`](./straight-made-flop-to-river-exact-probability).',
    how: `const p = await poker.straightMadeFlopToRiverExactProbabilityAsync(hole, flop, dead);`,
    see: '[`straightMadeFlopToRiverExactProbability`](./straight-made-flop-to-river-exact-probability)',
  },
  {
    cat: 'monte-carlo',
    slug: 'simulate-hand-outcome-batch',
    title: 'simulateHandOutcomeBatch',
    pos: 9,
    sig: 'simulateHandOutcomeBatch(specs: SimBatchSpec[], out?: Float64Array): Float64Array',
    when: 'Range builders and dashboards that need many MC equities in one native call—amortizes N-API and card-parse overhead vs looping `simulateHandOutcome`.',
    how: `const specs = [{ holeCards: ['Ah','Kh'], board: ['Qh','Jh','2c'], numSimulations: 5000, seed: 42, villains: 1 }];
const out = poker.simulateHandOutcomeBatch(specs);`,
    see: '[Batch equity guide](/docs/guides/batch-equity) · [`simulateHandOutcomeBatchPacked`](./simulate-hand-outcome-batch-packed)',
  },
  {
    cat: 'monte-carlo',
    slug: 'simulate-hand-outcome-batch-packed',
    title: 'simulateHandOutcomeBatchPacked',
    pos: 10,
    sig: 'simulateHandOutcomeBatchPacked(holes: Uint8Array, boards: Uint8Array, meta: Uint32Array, out?: Float64Array): Float64Array',
    when: 'Same as batch specs, but holes/boards/meta are packed: `holes` length `2×n`, `boards` `5×n`, `meta` `Uint32Array` with `[numSim, seed, villains]` per row.',
    how: `const meta = new Uint32Array([5000, 42, 1]);
const eq = poker.simulateHandOutcomeBatchPacked(packCards(hole), packCards(board), meta);`,
    see: '[Batch equity guide](/docs/guides/batch-equity) · [Packed card input](/docs/concepts/packed-card-input)',
  },
  {
    cat: 'monte-carlo',
    slug: 'exact-hu-equity-vs-random-hand-batch',
    title: 'exactHuEquityVsRandomHandBatch',
    pos: 11,
    sig: 'exactHuEquityVsRandomHandBatch(holes: Uint8Array, boards: Uint8Array, boardCards: number, out?: Float64Array): Float64Array',
    when: 'Many exact HU spots with packed cards; `boardCards` is 3–5 per row.',
    how: `const eq = poker.exactHuEquityVsRandomHandBatch(holesPacked, boardsPacked, 3);`,
    see: '[`exactHuEquityVsRandomHand`](./exact-hu-equity-vs-random-hand) · [Batch equity guide](/docs/guides/batch-equity)',
  },
  {
    cat: 'hands-and-equity',
    slug: 'benchmark-evaluator-throughput-async',
    title: 'benchmarkEvaluatorThroughputAsync',
    pos: 12,
    sig: 'benchmarkEvaluatorThroughputAsync(iterations?: number): Promise<EvaluatorBenchmarkResult>',
    when: 'Run evaluator benchmarks without blocking the event loop.',
    how: `const bench = await poker.benchmarkEvaluatorThroughputAsync(50_000);`,
    see: '[`benchmarkEvaluatorThroughput`](./benchmark-evaluator-throughput)',
  },
  {
    cat: 'hands-and-equity',
    slug: 'evaluate-hand-strength-fast-batch',
    title: 'evaluateHandStrengthFastBatch',
    pos: 13,
    sig: 'evaluateHandStrengthFastBatch(holes: Uint8Array, boards: Uint8Array, boardCards?: number, out?: Float64Array): Float64Array',
    when: 'Sort or filter many hands using the forge strength encoding in one crossing.',
    how: `const strengths = poker.evaluateHandStrengthFastBatch(holes, boards, 5);`,
    see: '[`evaluateHandStrengthFast`](./evaluate-hand-strength-fast) · [Batch equity guide](/docs/guides/batch-equity)',
  },
  {
    cat: 'strategy',
    slug: 'decide-action-async',
    title: 'decideActionAsync',
    pos: 2,
    sig: 'decideActionAsync(state: NativePokerState | PokerStateBytes, config: NativeBotConfig, opponentModel?: NativeOpponentModel | null, heroSeat?: number): Promise<DecisionResult>',
    when: 'Bots and simulators that call `decideAction` often and must keep the JS thread responsive.',
    how: `const d = await poker.decideActionAsync(state, { monteCarloSimulations: 2000 }, null, 0);`,
    see: '[`decideAction`](./decide-action) · [decideAction guide](/docs/guides/decide-action)',
  },
  {
    cat: 'strategy',
    slug: 'encode-poker-state',
    title: 'encodePokerState',
    pos: 3,
    sig: 'encodePokerState(state: NativePokerState): PokerStateBytes',
    when: 'Cache or transmit table snapshots without re-parsing nested JS objects on every `decideAction` call.',
    how: `const bytes = poker.encodePokerState(state);
// or: const bytes = require('poker-calculations/encode').packPokerState(state);`,
    see: '[Packed poker state](/docs/concepts/packed-poker-state) · [`decodePokerState`](./decode-poker-state)',
  },
  {
    cat: 'strategy',
    slug: 'decode-poker-state',
    title: 'decodePokerState',
    pos: 4,
    sig: 'decodePokerState(bytes: PokerStateBytes): NativePokerState',
    when: 'Inspect PKST bytes or round-trip for debugging.',
    how: `const state = poker.decodePokerState(bytes);`,
    see: '[`encodePokerState`](./encode-poker-state) · [Packed poker state](/docs/concepts/packed-poker-state)',
  },
];

for (const p of pages) {
  const dir = join(root, 'docs/reference/api', p.cat);
  if (!existsSync(dir)) mkdirSync(dir, {recursive: true});
  const body = `---
title: ${p.title}
sidebar_position: ${p.pos}
---

# \`${p.title}\`

<div className="apiSignature">{\`${p.sig}\`}</div>

## Import

\`\`\`js
const poker = require('poker-calculations');
\`\`\`

ESM (Node):

\`\`\`js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const poker = require('poker-calculations');
\`\`\`

## When to use

${p.when}

## How to use

\`\`\`js
const poker = require('poker-calculations');

${p.how}
\`\`\`

## See also

${p.see}
`;
  writeFileSync(join(dir, `${p.slug}.mdx`), body);
  console.log('wrote', p.cat, p.slug);
}
