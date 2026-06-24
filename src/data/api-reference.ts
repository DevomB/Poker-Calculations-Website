export type ApiReferenceCategory = {
  title: string;
  to: string;
  count: number;
  suit: '♠' | '♥' | '♦' | '♣';
};

// Single source of truth for API export counts used by the homepage and docs.
// Update this file when exports move between categories or when the total changes.
export const apiReferenceCategories: ApiReferenceCategory[] = [
  {title: 'Hands & Equity', to: '/docs/reference/api/hands-and-equity', count: 16, suit: '♠'},
  {title: 'Monte Carlo', to: '/docs/reference/api/monte-carlo', count: 21, suit: '♥'},
  {title: 'Strategy', to: '/docs/reference/api/strategy', count: 14, suit: '♣'},
  {title: 'Pot & EV', to: '/docs/reference/api/pot-and-ev', count: 21, suit: '♦'},
  {title: 'Stacks & Display', to: '/docs/reference/api/stacks-and-display', count: 17, suit: '♠'},
  {title: 'Heuristics & Draws', to: '/docs/reference/api/heuristics-and-draws', count: 32, suit: '♥'},
  {title: 'Reverse Implied', to: '/docs/reference/api/reverse-implied', count: 4, suit: '♣'},
  {title: 'Statistics & Risk', to: '/docs/reference/api/statistics-and-risk', count: 12, suit: '♦'},
  {title: 'Kelly & Jam', to: '/docs/reference/api/kelly-and-jam', count: 10, suit: '♠'},
  {title: 'GTO Frequencies', to: '/docs/reference/api/gto-frequencies', count: 7, suit: '♥'},
  {title: 'Sizing & Commitment', to: '/docs/reference/api/sizing-and-commitment', count: 21, suit: '♣'},
  {title: 'Fold Equity', to: '/docs/reference/api/fold-equity', count: 13, suit: '♦'},
  {title: 'Multiway', to: '/docs/reference/api/multiway', count: 5, suit: '♠'},
  {title: 'ICM', to: '/docs/reference/api/icm', count: 12, suit: '♥'},
  {title: 'Side Pots', to: '/docs/reference/api/side-pots', count: 6, suit: '♣'},
  {title: 'Tournament ICM', to: '/docs/reference/api/cooperative-icm', count: 10, suit: '♦'},
  {title: 'Exact Runouts', to: '/docs/reference/api/combinatorics-exact', count: 21, suit: '♠'},
  {title: 'Subgame & Ranges', to: '/docs/reference/api/subgame-theory', count: 12, suit: '♥'},
  {title: 'Range Tools', to: '/docs/reference/api/range-tools', count: 20, suit: '♦'},
  {title: 'Board Texture', to: '/docs/reference/api/board-texture', count: 16, suit: '♠'},
  {title: 'Opponent Modeling', to: '/docs/reference/api/opponent-modeling', count: 10, suit: '♥'},
];

export const apiReferenceTotalExports = apiReferenceCategories.reduce(
  (sum, category) => sum + category.count,
  0,
);

