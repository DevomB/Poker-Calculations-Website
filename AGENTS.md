# Agent guide — documentation site (this repo)

Read this before changing **dependencies**, **CI/deploy config**, or **imports that reach into other projects.

This folder is the **Poker-Calculations** docs site. It is usually deployed **on its own** (e.g. Vercel / **Poker-Calculations-Website**). The `poker-calculations` library lives in a **different** repository and is consumed **only via npm**.

In a local monorepo checkout you may also see a sibling `NPM/` folder — **that path does not exist on CI or Vercel.**

---

## Rule: do not wire other projects in with local paths

### Do not commit `file:` dependencies to another repo/folder

**Wrong** (breaks Vercel / frozen `pnpm install`):

```json
"poker-calculations": "file:../NPM"
```

**Right** for production / main branch:

```json
"poker-calculations": "2.0.0"
```

Run `pnpm install` and commit **`pnpm-lock.yaml`**. CI uses a **frozen lockfile** by default — specifiers in `package.json` and the lockfile must match.

Temporary local linking (`file:../NPM` in a monorepo) is OK on a dev branch; **revert and refresh the lockfile before push.**

### Do not import paths the package does not export

`poker-calculations` only exports `.` and `./encode` (see the package’s `exports` on npm).

**Wrong** (Node 20+ → `ERR_PACKAGE_PATH_NOT_EXPORTED`):

```ts
require('poker-calculations/package.json');
```

**Right** (see `docusaurus.config.ts`):

```ts
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(__filename);
const pkgRoot = path.dirname(require.resolve('poker-calculations'));
const { version } = require(path.join(pkgRoot, 'package.json'));
```

### Do not assume sibling directories exist at runtime

Do not rely on `../NPM`, paths outside this repo root, or monorepo-only layouts in config or scripts.

### Same project = local paths are fine

Inside **this** site repo only: `docs/`, `src/`, `static/`, `scripts/`, etc.

---

## Docs ↔ npm package workflow

1. Depend on a **published** `poker-calculations` version in `package.json`.
2. After the library releases, bump the version here, run `pnpm install`, commit `pnpm-lock.yaml`.
3. Run `pnpm check:docs` and `pnpm build`.
4. See `MAINTAINING-DOCS.md` for MDX rules.

---

## Checklist before push / deploy

- [ ] `package.json` and `pnpm-lock.yaml` agree (`pnpm install --frozen-lockfile`).
- [ ] No committed `file:../` (or other) cross-repo specifiers.
- [ ] No `poker-calculations/...` imports except `.` and `/encode`.
- [ ] Version reads use `require.resolve('poker-calculations')`, not `poker-calculations/package.json`.

---

## Failures this avoids

- `ERR_PNPM_OUTDATED_LOCKFILE` — lockfile vs `package.json` mismatch.
- `ERR_PACKAGE_PATH_NOT_EXPORTED` — deep import not in `exports`.
- Vercel build errors — no sibling `NPM` on the build machine.

**When in doubt: use the published npm package only.**
