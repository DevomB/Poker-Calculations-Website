# Maintaining documentation

**Cross-repo / CI:** See [AGENTS.md](./AGENTS.md) — do not commit `file:../NPM` or other local path dependencies; use a published `poker-calculations` version and an updated `pnpm-lock.yaml`.

API pages under `docs/reference/api/` are **hand-written MDX**. Do not generate doc content from `index.d.ts` or `binding.cpp`, and **do not add** repo scripts that scaffold or overwrite MDX (they drift from exports and mislead maintainers).

In `NPM/`, maintain `native/binding_register.cpp` by hand alongside new bindings—no codegen for the export table.

**Do not add migration guides** (`migrating-v2`, `MIGRATION_v2.md`, versioned upgrade pages, or “added in vX” labels). Document current behavior only. Do not keep stub pages for removed exports—delete the MDX and update `check:docs` if needed.

**Do not use internal feature IDs** (`P1`, `P22`, etc.) in MDX, README, or public JSDoc—describe behavior by function name instead.

## Content accuracy checklist (when adding or editing docs)

1. Copy `apiSignature` and constraints from `NPM/index.d.ts` (installed `poker-calculations` in Website).
2. Cross-check Monte Carlo, exact HU, ICM, and intervals against `NPM/NUMERICAL.md`.
3. No “PKST v1” product wording—use **PKST packed state**; wire **layout version byte** only in the PKST concept page.
4. Run from `Website/`:

   ```bash
   pnpm check:all
   pnpm build
   ```

5. Before PR: `rg '\bP\d+' Website/docs NPM/index.d.ts NPM/include/poker` — expect no doc/comment hits (C++ pot variable `P0` in `poker_math.cpp` is fine).

When the NPM package adds or renames an export:

1. Update `NPM/index.d.ts` and native bindings (`NPM/native/binding_register.cpp` registers exports).
2. Add or edit the matching `.mdx` under the correct category folder (kebab-case slug from camelCase).
3. Include **Import**, **When to use**, and **How to use** with a realistic snippet. Document current behavior only.
4. Run from `Website/`:

   ```bash
   pnpm check:docs
   pnpm build
   ```

`check:docs` verifies every `PokerCalculations` export in `index.d.ts` has a corresponding MDX slug, and that every API MDX page maps to a current export.
