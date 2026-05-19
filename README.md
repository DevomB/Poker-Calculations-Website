# Poker Calculations — docs site

Static site for [poker-calculator.devomb.com](https://poker-calculator.devomb.com/) (Docusaurus 3).

Visual identity and tokens: [`BRAND.md`](BRAND.md), [`src/css/tokens.css`](src/css/tokens.css), and [`src/css/custom.css`](src/css/custom.css).

## Commands

```bash
pnpm install
pnpm start          # dev server
pnpm run build      # output in `build/`
pnpm run gen-docs   # regenerate `docs/api/**` from `../NPM/index.d.ts` + `../NPM/FEATURES_ADDED.md`
```

## Generated `.docusaurus` (authoritative for routing)

After **`pnpm run build`** or **`pnpm start`**, Docusaurus writes a cache under [`.docusaurus/`](.docusaurus/). **Do not edit it** (see `DONT-EDIT-THIS-FOLDER`). Use it when you need to verify framework output:

| File | Use it to confirm |
|------|-------------------|
| [`.docusaurus/docusaurus.config.mjs`](.docusaurus/docusaurus.config.mjs) | **Resolved** site config (presets, merged theme options, plugins). |
| [`.docusaurus/globalData.json`](.docusaurus/globalData.json) | **Doc IDs** (e.g. `api/index` for navbar `docId`), paths, and which **sidebar** each doc uses (`apiSidebar`). |
| [`.docusaurus/routes.js`](.docusaurus/routes.js) | **URL paths** and `sidebar` props for each route. |
| [`.docusaurus/registry.js`](.docusaurus/registry.js) | Webpack component registry for lazy-loaded pages. |

Example: navbar `docId: 'api/index'` must match `globalData.json` → `docusaurus-plugin-content-docs` → `versions[0].docs` entry with `"id": "api/index"`.

## Local search

Search is provided by `@easyops-cn/docusaurus-search-local` (see `themes` in [`docusaurus.config.ts`](docusaurus.config.ts)). The index file is emitted to `build/search-index.json` at the end of `pnpm run build`.
