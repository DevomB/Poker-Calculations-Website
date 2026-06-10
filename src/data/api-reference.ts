export type ApiReferenceCategory = {
  title: string;
  to: string;
  count: number;
  suit: '♠' | '♥' | '♦' | '♣';
};

// Single source of truth for API export counts used by the homepage and docs.
// Update this file when exports move between categories or when the total changes.
export const apiReferenceCategories: ApiReferenceCategory[] = [
  {title: 'Hands & equity', to: '/docs/reference/api/hands-and-equity', count: 16, suit: '♠'},
  {title: 'Monte Carlo', to: '/docs/reference/api/monte-carlo', count: 21, suit: '♥'},
  {title: 'Strategy', to: '/docs/reference/api/strategy', count: 4, suit: '♣'},
  {title: 'Pot & EV', to: '/docs/reference/api/pot-and-ev', count: 21, suit: '♦'},
  {title: 'Stacks & display', to: '/docs/reference/api/stacks-and-display', count: 17, suit: '♠'},
  {title: 'Heuristics & draws', to: '/docs/reference/api/heuristics-and-draws', count: 32, suit: '♥'},
  {title: 'Reverse implied', to: '/docs/reference/api/reverse-implied', count: 4, suit: '♣'},
  {title: 'Statistics & risk', to: '/docs/reference/api/statistics-and-risk', count: 12, suit: '♦'},
  {title: 'Kelly & jam', to: '/docs/reference/api/kelly-and-jam', count: 10, suit: '♠'},
  {title: 'GTO frequencies', to: '/docs/reference/api/gto-frequencies', count: 7, suit: '♥'},
  {title: 'Sizing & commitment', to: '/docs/reference/api/sizing-and-commitment', count: 7, suit: '♣'},
  {title: 'Fold equity', to: '/docs/reference/api/fold-equity', count: 13, suit: '♦'},
  {title: 'Multiway', to: '/docs/reference/api/multiway', count: 5, suit: '♠'},
  {title: 'ICM', to: '/docs/reference/api/icm', count: 12, suit: '♥'},
  {title: 'Side pots', to: '/docs/reference/api/side-pots', count: 6, suit: '♣'},
  {title: 'Tournament ICM', to: '/docs/reference/api/cooperative-icm', count: 10, suit: '♦'},
  {title: 'Exact runouts', to: '/docs/reference/api/combinatorics-exact', count: 11, suit: '♠'},
  {title: 'Subgame & ranges', to: '/docs/reference/api/subgame-theory', count: 12, suit: '♥'},
];

export const apiReferenceTotalExports = apiReferenceCategories.reduce(
  (sum, category) => sum + category.count,
  0,
);