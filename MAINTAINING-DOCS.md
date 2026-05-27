# Maintaining documentation

API pages under `docs/reference/api/` are **hand-written MDX**. Do not generate doc content from `index.d.ts` or `binding.cpp`.

When the NPM package adds or renames an export:

1. Update `NPM/index.d.ts` and native bindings (`NPM/native/binding_register.cpp` registers exports).
2. Add or edit the matching `.mdx` under the correct category folder (kebab-case slug from camelCase).
3. Include **Import**, **When to use**, and **How to use** with a realistic snippet. Document current behavior only.
4. Run from `Website/`:

   ```bash
   pnpm check:docs
   pnpm build
   ```

`check:docs` verifies every `PokerCalculations` export in `index.d.ts` has a corresponding MDX slug. Removed exports may keep a short stub page listed in `ALLOWED_EXTRA_DOC_SLUGS` in `scripts/check-docs-coverage.mjs`.
