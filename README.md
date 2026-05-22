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

1. Update [`NPM/native/binding.cpp`](../NPM/native/binding.cpp) and [`index.d.ts`](../NPM/index.d.ts).
2. Hand-write `docs/reference/api/<category>/<slug>.mdx` (Import / When to use / How to use).
3. Run `pnpm check:docs`.

## Brand assets

Replace placeholders in `static/img/` when available:

- `favicon.ico`
- `social-card.png`
- `logo.svg` (optional navbar logo)
