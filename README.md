# Poker Calculations — documentation site

Docs for [`poker-calculations`](https://www.npmjs.com/package/poker-calculations), built with Docusaurus and deployed at [poker-calculations.devomb.com](https://poker-calculations.devomb.com).

**Agents:** read [AGENTS.md](./AGENTS.md) before changing dependencies. This site deploys on its own and uses the published npm package; never commit `file:../NPM`.

## Develop

```bash
pnpm install
pnpm start          # http://localhost:3000
```

## Check and build

```bash
pnpm check:docs         # every export documented once, signatures match index.d.ts
pnpm check:examples     # run every code example against the installed package
pnpm build
pnpm serve
```

`pnpm check:examples --write` refreshes the `Output` block under each example from a real run. [MAINTAINING-DOCS.md](./MAINTAINING-DOCS.md) explains how the API reference is organized and how to update it for a new package version.

## Data

| File | What it is | Refresh with |
| --- | --- | --- |
| `src/data/api-families.json` | Every export grouped into sections, categories, and pages; drives the sidebar and counts | edit by hand |
| `src/data/hero-hands.json` | Exact street-by-street equities for the homepage table | `pnpm build:hero-hands` |
| `src/data/downloads.json` | All-time npm downloads for the first paint (the page also fetches the live number) | `pnpm fetch:downloads` (runs on every Vercel build) |

## Deploy (Vercel)

Root directory `Website`; `vercel.json` sets the build command (`fetch:downloads`, `check:docs`, `check:examples`, `build`) and the redirects from the old one-page-per-function URLs. No environment variables.
