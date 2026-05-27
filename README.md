# Poker Calculations — documentation site

Official docs for [`poker-calculations`](https://www.npmjs.com/package/poker-calculations), built with Docusaurus.

## Development

```bash
pnpm install
pnpm start
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm check:docs
pnpm build
pnpm serve
```

## Deploy on Vercel

1. Import the repository.
2. Set **Root Directory** to `Website`.
3. Build uses `vercel.json` (`check:docs`, `build`).
4. Attach custom domain **poker-calculations.devomb.com**.

No environment variables required.

## Maintaining API docs

When the NPM package adds or renames an export:

1. Publish a new `poker-calculations` release (update `index.d.ts` in the package).
2. Point the `poker-calculations` devDependency at the package (`file:../NPM` for local work, or a published version) and run `pnpm install`.
3. For **removed** exports, keep a short stub MDX page and add its slug to `ALLOWED_EXTRA_DOC_SLUGS` in `scripts/check-docs-coverage.mjs`.
4. Hand-write `docs/reference/api/<category>/<slug>.mdx` (Import / When to use / How to use).
5. Run `pnpm check:docs` (reads `index.d.ts` from the linked `poker-calculations` package).

## Brand assets

Replace placeholders in `static/img/` when available:

- `favicon.ico`
- `social-card.png`
- `logo.svg` (optional navbar logo)
