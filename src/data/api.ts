import families from './api-families.json';

export type Suit = '♠' | '♥' | '♦' | '♣';
export type ApiFamily = {slug: string; title: string; functions: string[]};
export type ApiCategory = {slug: string; title: string; suit: Suit; blurb: string; families: ApiFamily[]};
export type ApiSection = {title: string; categories: ApiCategory[]};

/** Every export, grouped into sections → categories → family pages. Source: api-families.json. */
export const apiSections = families.sections as ApiSection[];

export const apiCategories = apiSections.flatMap((s) => s.categories);

export const apiFunctionCount = apiCategories.reduce(
  (n, c) => n + c.families.reduce((m, f) => m + f.functions.length, 0),
  0,
);

export const apiPageCount = apiCategories.reduce((n, c) => n + c.families.length, 0);

export const categoryUrl = (c: ApiCategory) => `/docs/reference/api/${c.slug}`;

export const functionCount = (c: ApiCategory) => c.families.reduce((n, f) => n + f.functions.length, 0);
