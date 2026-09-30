# Maintaining documentation

**Cross-repo / CI:** see [AGENTS.md](./AGENTS.md). Depend on a published `poker-calculations` version; never commit `file:../NPM`.

## How the API reference is organized

- `src/data/api-families.json` is the single source of truth: seven sections, their categories, and the **family pages** in each. Every export belongs to exactly one family; the first function in a family is the page's primary.
- Each family is one MDX page at `docs/reference/api/<category>/<family>.mdx`, with one section per function:

  ````mdx
  ## `functionName` \{#functionName\}

  What it does (from the JSDoc in index.d.ts, edited for readers).

  ```ts
  <the declaration, copied exactly from index.d.ts>
  ```

  ```js title="Example"
  const poker = require('poker-calculations');
  ...
  ```

  ```text title="Output"
  <filled in by pnpm check:examples --write>
  ```
  ````

- The sidebar (`sidebars.ts`), the API overview, the category cards, and the homepage counts are all generated from `api-families.json`. Do not hard-code counts.

## When the package changes

1. Bump `poker-calculations` in `package.json`, run `pnpm install`, commit `pnpm-lock.yaml`.
2. Run `pnpm check:docs`. It fails when an export is missing from `api-families.json`, when a documented function no longer exists, when a page or section is missing, or when a signature block differs from `index.d.ts`.
3. Add new functions to a family in `api-families.json` (or a new family page), write the section, then run `pnpm check:examples --write` to fill in real output.
4. Remove pages for deleted functions, and add a redirect in `vercel.json` from the old URL.

## Examples

- Every `js` block runs. `pnpm check:examples` executes all of them against the installed package and fails if any throws; Vercel runs it before each build.
- API page examples run on their own. Guide and concept pages run their blocks in order as one script, so later blocks may use earlier variables, but must not redeclare them.
- Never type an output by hand. Write the code, then `pnpm check:examples --write`. Monte Carlo digits differ slightly between platforms; title an output block `Output (varies)` if it should never be rewritten.
- Comments in examples that state a value must match the output.

## Style

- Document current behavior only: no migration guides, no "added in vX" labels.
- The pot convention is package-wide: `pot` / `potBeforeCall` includes villain's bet. Keep examples consistent with [Numerical semantics](docs/concepts/numerical-semantics.mdx).
- Hand-class arrays use the 169 order `22, 32s, 32o, …, AKo, AA` (index 0 is 22, 168 is AA).

## Checks

```bash
pnpm check:all   # check:docs + check:examples + typecheck
pnpm build
```
