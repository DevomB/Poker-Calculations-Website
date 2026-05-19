# Poker Calculations — documentation site brand

This guide applies to the [Docusaurus](https://docusaurus.io/) site under `Website/`. It is the source of truth for colors, type, and UI chrome for [poker-calculator.devomb.com](https://poker-calculator.devomb.com).

## At a glance (what the colors *are*)

There are **two named themes**, switched with the site’s light/dark toggle:

| Mode | Name | In one sentence |
|------|------|-----------------|
| **Light** | **Velvet Room** | Warm cream paper (`#F5F0E8`), warm white cards (`#FFFCF7`), **ink navy** chrome (`#1B2838`), **brass** for money/CTAs (`#D4AF37`), **burgundy** for secondary accents (`#722F37`). Reads “private card room,” not neon casino. |
| **Dark** | **Midnight Suite** | Near-black canvas (`#0A0C10`), charcoal panels (`#12151C`), **emerald** for links and focus (`#10B981`), **mint** for softer emphasis (`#6EE7B7`), **red** only for danger (`#DC2626`). Reads “solver / terminal at night.” |

Implementation detail: both themes reuse the **same CSS variable names** (`--pc-color-primary`, etc.); only the **values** swap in `[data-theme='dark']`. See [`src/css/tokens.css`](src/css/tokens.css).

**Important:** In **light** mode, `--pc-color-primary` is **navy** and is used for *chrome* (navbar, footer) and Infima “primary” controls — **not** for paragraph hyperlinks. Body links use `--pc-color-link` (steel blue `#1E4D7A`) and `--pc-color-link-hover` (burgundy `#722F37`). In **dark** mode, links track **emerald** (`--pc-color-primary` / `--pc-color-link`).

## Brand story

**Precise NLHE math for Node — native speed, no fluff.** The site should feel like a serious developer tool with a subtle card-room identity: readable for long API sessions, confident in typography, never gimmicky or “casino neon.”

## Logo

| Variant | File | Use |
|--------|------|-----|
| Light | [`static/img/logo.svg`](static/img/logo.svg) | Navbar and favicon when the UI is in **light** mode |
| Dark | [`static/img/logo-dark.svg`](static/img/logo-dark.svg) | Navbar when the UI is in **dark** mode (`themeConfig.navbar.logo.srcDark`) |

**Clear space:** keep padding equal to at least half the logo height on all sides inside the navbar.

**Minimum size:** 24px height in the navbar; avoid scaling below 20px.

**Do not** stretch non-uniformly, recolor arbitrarily, or place on busy backgrounds without sufficient contrast.

## Color system

Semantic tokens live in [`src/css/tokens.css`](src/css/tokens.css) as `--pc-*`. Light and dark reuse the **same names** with different values.

### Light — Velvet Room (`:root`)

| Token | Hex | Usage |
|-------|-----|--------|
| `--pc-color-primary` | `#1B2838` | Navbar, hero, Infima primary buttons — **not** body hyperlinks |
| `--pc-color-primary-hover` | `#152A36` | Hover on navy controls |
| `--pc-color-accent` | `#D4AF37` | CTAs, highlights, active underlines |
| `--pc-color-secondary` | `#722F37` | Feature accents, sidebar active rail, blockquotes |
| `--pc-color-link` | `#722F37` | **In-article hyperlinks** (wine on cream — same family as secondary) |
| `--pc-color-link-hover` | `#4A1A22` | Link hover (darker wine) |
| `--pc-color-bg` | `#F5F0E8` | Page background |
| `--pc-color-surface` | `#FFFCF7` | Cards, table headers, admonition surfaces |
| `--pc-color-text` | `#1A2332` | Body text |
| `--pc-color-muted` | `#5C6478` | Secondary labels |
| `--pc-color-border` | `#E2D9CC` | Dividers, inputs |
| `--pc-color-danger` | `#9B2C3E` | Danger / strong warning |
| `--pc-color-code-bg` | `#EDE8DF` | Code blocks |

### Dark — Midnight Suite (`[data-theme='dark']`)

| Token | Hex | Usage |
|-------|-----|--------|
| `--pc-color-primary` | `#10B981` | Links, active nav, focus, search keyboard row |
| `--pc-color-primary-hover` | `#34D399` | Hover |
| `--pc-color-accent` | `#6EE7B7` | Softer emphasis, tips, blockquote rail |
| `--pc-color-secondary` | `#1E293B` | Depth / borders (not the main hue) |
| `--pc-color-link` | `#34D399` | Same as primary — body links match interactive green |
| `--pc-color-link-hover` | `#6EE7B7` | Link hover |
| `--pc-color-link` | `#34D399` | In-article links (bright emerald on dark) |
| `--pc-color-link-hover` | `#6EE7B7` | Link hover |
| `--pc-color-bg` | `#0A0C10` | Page background |
| `--pc-color-surface` | `#12151C` | Navbar, footer, cards |
| `--pc-color-text` | `#E8EAED` | Body text |
| `--pc-color-muted` | `#94A3B8` | Secondary labels |
| `--pc-color-border` | `#2A3140` | Dividers |
| `--pc-color-danger` | `#DC2626` | Danger / errors |
| `--pc-color-code-bg` | `#161B24` | Code blocks |

### Cross-mode rules

- Do **not** use burgundy as the dark primary; emerald is the dark brand anchor.
- Reserve strong red in dark mode for danger; in light mode prefer burgundy family for warnings where appropriate.
- Illustrations and inline SVGs should use `currentColor` or `var(--pc-*)` so one asset works in both themes.

## Typography

| Role | Family | Notes |
|------|--------|--------|
| UI / body | **DM Sans** | Loaded via `docusaurus.config.ts` `stylesheets` |
| Code | **JetBrains Mono** | `--ifm-font-family-monospace` |

**Scale (Infima defaults + tuning):** hero title uses tighter letter-spacing; body line-height tuned for long docs in `custom.css`.

## Spacing, radius, shadow

| Token | Light | Dark |
|-------|-------|------|
| `--pc-radius-sm` | `6px` | `6px` |
| `--pc-radius-md` | `10px` | `10px` |
| `--pc-radius-lg` | `14px` | `14px` |
| `--pc-shadow-card` | soft warm lift | subtle low glow |

## Components

- **Navbar:** Navy bar (light) / charcoal bar (dark); padded links; brass or emerald active underline; search field with border + focus ring; `--search-local-*` tokens style the local-search dropdown.
- **Sidebar:** Right-rounded rows; burgundy (light) or emerald (dark) active rail; uppercase category labels.
- **Footer:** Uppercase brass/emerald section titles; link underline on hover; wider vertical padding.
- **Tables:** Outer border, uppercase muted headers, zebra striping, row hover wash.
- **Admonitions:** Left rail + shadow; distinct surfaces for success / warning / danger / info / tip (tip uses brass in light, emerald tint in dark).
- **Search:** See `tokens.css` `--search-local-*` (modal, hits, keyboard highlight, active-row text).
- **Buttons:** Primary = brass (light) / emerald (dark); secondary = outline; see `custom.css`.

**Do:** keep hero gradients restrained; use whitespace; test both color modes.

**Don’t:** neon gradients behind body copy; random third palettes per page; suit red for non-danger UI in dark mode.

## Accessibility

Target **WCAG 2.1 AA** for normal text (4.5:1) and large text (3:1). Primary body pairs: `#1A2332` on `#F5F0E8` (light), `#E8EAED` on `#0A0C10` (dark). Re-check whenever changing primary or link colors.
