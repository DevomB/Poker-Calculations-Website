# Poker Calculations — Color System

> **Audience:** the next agent or contributor who will sweep this color
> system across the rest of the docs site (sidebar, code blocks,
> admonitions, footer, tables, search modal, API reference pages, etc.).
>
> The landing page (`Website/src/pages/index.tsx` +
> `Website/src/pages/index.module.css`) and the global token layer in
> `Website/src/css/custom.css` already use this system. Your job is to
> bring the rest of the site into alignment with the conventions below.

---

## 1. Design intent

The brand is **a high-stakes poker table**:

- **Felt green** is the table — the calm, grounding surface.
- **Casino gold** is the chip — the *value*, used sparingly for CTAs,
  the brand mark, and small accents that should "shine".
- **Suit red** is the heart/diamond — used for danger, deletions,
  the red suits on playing cards, and editorial highlights.
- **Ink black** with a faint green undertone is everything dark
  (backgrounds, code, raised surfaces).
- **Chip cream / ivory** replaces pure white as the text color, because
  pure `#fff` on near-black looks clinical; cream feels warm and
  felt-table-like.

**Mood words:** considered, luxurious, focused, precise — *not* loud,
*not* casino-tacky, *not* neon.

**Hierarchy of attention (most → least):**

1. Gold CTAs (primary buttons, brand badges, the v-number, key
   "explore" links).
2. Cream text & big headings.
3. Felt green for secondary CTAs, success states, "$"/numeric prompts.
4. Suit red — sparingly — for danger, deletions, keywords in code, and
   ♥/♦ suit glyphs.
5. Ink surfaces in the background, providing depth.

If you find yourself reaching for a second strong accent — stop. The
palette has exactly **three** brand hues (felt, gold, red). Everything
else is ink or chip.

---

## 2. The full token table

All tokens live on `:root` in
[`Website/src/css/custom.css`](Website/src/css/custom.css). **Always
consume tokens, never hard-code hex values in components.**

### 2.1 Raw scales

| Token                | Hex        | Notes / where it shines                                    |
| -------------------- | ---------- | ---------------------------------------------------------- |
| `--poker-felt-50`    | `#e8f5ed`  | Tinted backgrounds for success admonitions only.           |
| `--poker-felt-100`   | `#c3e3ce`  | Reserved (don't use yet).                                  |
| `--poker-felt-300`   | `#4ea676`  | Lighter felt accent — secondary text on dark, link-hover.  |
| `--poker-felt-500`   | `#1a9457`  | Mid felt — secondary CTAs, success icons, code numbers.    |
| `--poker-felt-600`   | `#0e6b3a`  | Brand felt — section accents, table-rail glow.             |
| `--poker-felt-700`   | `#0a5530`  | Hover/active felt.                                         |
| `--poker-felt-800`   | `#073d22`  | Deepest felt — hero vignette only.                         |
| `--poker-felt-900`   | `#042415`  | Almost-black felt — reserved.                              |
| `--poker-gold-300`   | `#f5e0a5`  | Soft gold — code strings, hover-link, badge text.          |
| `--poker-gold-400`   | `#f5c843`  | Bright gold — link color, primary-button gradient top.     |
| `--poker-gold-500`   | `#d4af37`  | **Brand gold** — primary CTA, brand mark, eyebrow accents. |
| `--poker-gold-600`   | `#a8821e`  | Pressed/border gold.                                       |
| `--poker-gold-700`   | `#7a5d12`  | Deepest gold — reserved for borders on dark surfaces.      |
| `--poker-red-400`    | `#ff5a5f`  | Soft suit red — code keywords, ♥/♦ icons on dark.          |
| `--poker-red-500`    | `#e63946`  | Mid suit red — danger admonitions, deletion diff bg.       |
| `--poker-red-600`    | `#c8102e`  | **Suit red** — actual ♥/♦ glyphs on playing cards.         |
| `--poker-red-700`    | `#8b0a1f`  | Pressed/border red.                                        |
| `--poker-ink-900`    | `#0a0e0c`  | **Page background.**                                       |
| `--poker-ink-800`    | `#0f1512`  | Navbar, code blocks, hero base.                            |
| `--poker-ink-700`    | `#141a17`  | Elevated surface — cards, sidebars.                        |
| `--poker-ink-600`    | `#1d2520`  | Raised surface — hover, table headers, suit-chip badges.   |
| `--poker-ink-500`    | `#2a352f`  | Default border on dark.                                    |
| `--poker-ink-400`    | `#4a564f`  | Strong border, comment color in code.                      |
| `--poker-chip-300`   | `#8a948f`  | Muted text — captions, helper text, counts.                |
| `--poker-chip-200`   | `#c4ccc7`  | Secondary text — subtitles, body small.                    |
| `--poker-chip-100`   | `#e8ebe9`  | Body copy on dark.                                         |
| `--poker-chip-50`    | `#f5f1e8`  | **Primary text / headings** — warm cream.                  |

### 2.2 Semantic aliases (prefer these)

| Alias                       | Resolves to            | Use for                                             |
| --------------------------- | ---------------------- | --------------------------------------------------- |
| `--poker-bg`                | `--poker-ink-900`      | `html`/`body` background, default page surface.     |
| `--poker-bg-elevated`       | `--poker-ink-700`      | Sidebars, cards, modal bodies, navbar mobile menu.  |
| `--poker-bg-raised`         | `--poker-ink-600`      | Hover states on elevated surfaces, badge chips.     |
| `--poker-border`            | `--poker-ink-500`      | Hairlines between surfaces — default border.        |
| `--poker-border-strong`     | `--poker-ink-400`      | Form-control borders, the ghost button.             |
| `--poker-text`              | `--poker-chip-50`      | Headings & primary copy.                            |
| `--poker-text-muted`        | `--poker-chip-300`     | Helper, captions, "98 exports" counts.              |
| `--poker-primary`           | `--poker-gold-500`     | The single brand accent — CTAs, brand mark.         |
| `--poker-primary-hover`     | `--poker-gold-400`     | Hover state of the above.                           |
| `--poker-accent`            | `--poker-felt-500`     | Secondary accent (success, prompt, OK).             |
| `--poker-danger`            | `--poker-red-600`      | Errors, destructive, danger admonitions.            |
| `--poker-suit-red`          | `--poker-red-600`      | ♥/♦ glyphs.                                         |
| `--poker-suit-black`        | `--poker-ink-900`      | ♠/♣ glyphs.                                         |

### 2.3 Docusaurus (Infima) mapping

These are already set in `custom.css`. **Do not change them** unless you
intentionally re-theme. They are the canonical bridge between our
palette and Docusaurus internals.

```css
--ifm-color-primary:          var(--poker-gold-500);
--ifm-color-primary-dark:     var(--poker-gold-600);
--ifm-color-primary-darker:   #9c771a;
--ifm-color-primary-darkest:  var(--poker-gold-700);
--ifm-color-primary-light:    var(--poker-gold-400);
--ifm-color-primary-lighter:  #f7d05a;
--ifm-color-primary-lightest: var(--poker-gold-300);

--ifm-background-color:           var(--poker-bg);
--ifm-background-surface-color:   var(--poker-bg-elevated);
--ifm-font-color-base:            var(--poker-text);
--ifm-font-color-secondary:       var(--poker-text-muted);
--ifm-link-color:                 var(--poker-gold-400);
--ifm-link-hover-color:           var(--poker-gold-300);
--ifm-navbar-background-color:    var(--poker-ink-800);
--ifm-footer-background-color:    var(--poker-ink-900);
--ifm-menu-color:                 var(--poker-chip-200);
--ifm-menu-color-active:          var(--poker-chip-50);
```

### 2.4 Legacy aliases (to remove)

These exist only so the rest of the site doesn't break while you migrate
it. **Your sweep should delete them** once every selector below has been
updated.

```css
--poker-white  → var(--poker-chip-50)
--poker-black  → var(--poker-ink-900)
--poker-red    → var(--poker-red-600)
--poker-gray   → var(--poker-ink-600)
--poker-blue   → var(--poker-gold-500)  /* old "blue" is now gold */
--poker-muted  → var(--poker-chip-300)
```

Once the rest of the site is migrated:

1. Search the repo for `--poker-white`, `--poker-black`, `--poker-red`,
   `--poker-gray`, `--poker-blue`, `--poker-muted`.
2. Replace each usage with the appropriate semantic token above.
3. Delete the six aliases from `:root` in `custom.css`.

---

## 3. Semantic role mapping (use this, not raw scales)

| Role                          | Token                              | Hex          |
| ----------------------------- | ---------------------------------- | ------------ |
| Page background               | `--poker-bg`                       | `#0a0e0c`    |
| Navbar background             | `--poker-ink-800`                  | `#0f1512`    |
| Footer background             | `--poker-bg` (ink-900)             | `#0a0e0c`    |
| Sidebar / card surface        | `--poker-bg-elevated`              | `#141a17`    |
| Hover/raised surface          | `--poker-bg-raised`                | `#1d2520`    |
| Default border (hairline)     | `--poker-border`                   | `#2a352f`    |
| Strong border (form fields)   | `--poker-border-strong`            | `#4a564f`    |
| Heading / body text           | `--poker-text` (chip-50)           | `#f5f1e8`    |
| Body small / subtitle         | `--poker-chip-200`                 | `#c4ccc7`    |
| Muted / caption / count       | `--poker-text-muted` (chip-300)    | `#8a948f`    |
| Primary CTA bg                | `--poker-gold-500`                 | `#d4af37`    |
| Primary CTA text              | `--poker-ink-900`                  | `#0a0e0c`    |
| Primary CTA hover bg          | `--poker-gold-400`                 | `#f5c843`    |
| Secondary CTA border/text     | `--poker-felt-500`                 | `#1a9457`    |
| Secondary CTA hover bg        | `rgba(26, 148, 87, 0.10)`          | —            |
| Link (default)                | `--poker-gold-400`                 | `#f5c843`    |
| Link (hover)                  | `--poker-gold-300`                 | `#f5e0a5`    |
| Active sidebar item           | `--poker-chip-50` + gold 3px rule  | —            |
| Sidebar active bg tint        | `rgba(212, 175, 55, 0.08)`         | —            |
| Code block bg                 | `--poker-ink-800`                  | `#0f1512`    |
| Code block border (accent)    | `border-left: 3px var(--poker-gold-500)` | —    |
| Inline `code` bg              | `rgba(212, 175, 55, 0.10)`         | —            |
| Inline `code` text            | `--poker-gold-300`                 | `#f5e0a5`    |
| Highlighted code line bg      | `rgba(212, 175, 55, 0.14)`         | —            |
| Prism: keyword                | `--poker-red-400`                  | `#ff5a5f`    |
| Prism: string                 | `--poker-gold-300`                 | `#f5e0a5`    |
| Prism: number                 | `--poker-felt-300`                 | `#4ea676`    |
| Prism: function name          | `#b9e3cb`                          | —            |
| Prism: comment                | `--poker-ink-400`                  | `#4a564f`    |
| Table header bg               | `--poker-ink-600`                  | `#1d2520`    |
| Table border                  | `--poker-border`                   | `#2a352f`    |
| Admonition info border        | `--poker-felt-500`                 | `#1a9457`    |
| Admonition info bg            | `rgba(26, 148, 87, 0.10)`          | —            |
| Admonition tip border         | `--poker-gold-500`                 | `#d4af37`    |
| Admonition tip bg             | `rgba(212, 175, 55, 0.08)`         | —            |
| Admonition warning border     | `#f5c843` (`--poker-gold-400`)     | `#f5c843`    |
| Admonition warning bg         | `rgba(245, 200, 67, 0.10)`         | —            |
| Admonition danger border      | `--poker-red-500`                  | `#e63946`    |
| Admonition danger bg          | `rgba(230, 57, 70, 0.10)`          | —            |
| ♥ / ♦ suit glyph              | `--poker-red-600`                  | `#c8102e`    |
| ♠ / ♣ suit glyph              | `--poker-chip-50`                  | `#f5f1e8`    |
| Focus outline                 | `2px solid var(--poker-gold-500)`  | —            |
| Selection bg                  | `rgba(212, 175, 55, 0.30)`         | —            |
| Scrollbar thumb               | `--poker-ink-500`                  | `#2a352f`    |
| Scrollbar thumb hover         | `--poker-ink-400`                  | `#4a564f`    |

---

## 4. Files that still need work

These files were intentionally **not** touched during the landing-page
rebuild. They are your scope.

| Path                                                  | What to fix |
| ----------------------------------------------------- | ----------- |
| `Website/src/css/custom.css`                          | Audit every selector below "LANDING uses its own module" and ensure each value resolves to a semantic alias (no raw hex except inside `:root`). Remove legacy aliases once site is migrated. |
| `Website/src/components/ApiDoc/**`                    | Sweep for hard-coded colors. Signatures should use `--poker-gold-500` left-border (already done globally in `.apiSignature`, but per-component overrides may need updating). |
| `Website/src/pages/404.tsx`                           | Plain page — use a small felt-tinted card, ghost button, and the cream text token. |
| `Website/src/theme/**` (if/when swizzled)            | Ensure any swizzled Docusaurus component uses tokens, not hex. |
| `Website/docs/**/*.md` / `*.mdx`                      | Inline HTML/CSS in MDX should reference tokens. Search MDX for `style="color:` or `style={{color`. |
| `Website/static/img/social-card.svg`                  | Recolor the social card so it matches the felt + gold palette. |
| `Website/static/img/logo.svg`                         | Current logo is a generic placeholder. If replacing, use felt green + gold. |
| Search modal (`.DocSearch-*`)                         | The button border is already token-driven. The full modal needs: bg `--poker-ink-800`, hit text `--poker-chip-50`, hit highlight `--poker-gold-500`. |
| Pagination (`.pagination-nav__link`)                  | bg `--poker-bg-elevated`, border `--poker-border`, hover border `--poker-gold-600`. |
| TOC right-rail (`.table-of-contents`)                | Active link `--poker-gold-400`, default `--poker-chip-300`, hover `--poker-chip-100`. |
| Breadcrumbs (`.breadcrumbs__link`)                    | Default `--poker-chip-300`, active `--poker-chip-50`, separator `--poker-ink-400`. |
| Tabs (`.tabs__item--active`)                          | Border-bottom 2px `--poker-gold-500`, color `--poker-chip-50`. |
| Mermaid / diagrams (if present)                       | Theme variables: primary `--poker-felt-600`, primaryText `--poker-chip-50`, lineColor `--poker-ink-400`, mainBkg `--poker-ink-700`. |

---

## 5. Selector cheat-sheet

Drop-in CSS the next agent can copy into `custom.css` after the
existing rules. Adjust as needed for what's actually visible.

```css
/* Selection */
::selection { background: rgba(212, 175, 55, 0.30); color: var(--poker-chip-50); }

/* Scrollbar (WebKit) */
::-webkit-scrollbar           { width: 10px; height: 10px; }
::-webkit-scrollbar-track     { background: var(--poker-ink-900); }
::-webkit-scrollbar-thumb     { background: var(--poker-ink-500); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: var(--poker-ink-400); }

/* Focus ring (global) */
:focus-visible { outline: 2px solid var(--poker-gold-500); outline-offset: 2px; border-radius: 4px; }

/* Inline code */
:not(pre) > code {
  background: rgba(212, 175, 55, 0.10);
  color: var(--poker-gold-300);
  border: 1px solid rgba(212, 175, 55, 0.22);
  padding: 0.1rem 0.4rem;
  border-radius: 6px;
}

/* Admonitions */
.theme-admonition          { border-radius: 10px; }
.theme-admonition-note     { border-color: var(--poker-border-strong); background: rgba(74, 86, 79, 0.10); }
.theme-admonition-tip      { border-color: var(--poker-gold-500);     background: rgba(212, 175, 55, 0.08); }
.theme-admonition-info     { border-color: var(--poker-felt-500);     background: rgba(26, 148, 87, 0.10); }
.theme-admonition-warning  { border-color: var(--poker-gold-400);     background: rgba(245, 200, 67, 0.10); }
.theme-admonition-danger   { border-color: var(--poker-red-500);      background: rgba(230, 57, 70, 0.10); }

/* Pagination */
.pagination-nav__link {
  background: var(--poker-bg-elevated);
  border: 1px solid var(--poker-border);
  border-radius: 10px;
}
.pagination-nav__link:hover {
  border-color: var(--poker-gold-600);
  background: var(--poker-bg-raised);
}
.pagination-nav__sublabel { color: var(--poker-text-muted); }
.pagination-nav__label    { color: var(--poker-chip-50); }

/* Breadcrumbs */
.breadcrumbs__link        { color: var(--poker-text-muted); }
.breadcrumbs__link:hover  { color: var(--poker-chip-50); }
.breadcrumbs__item--active .breadcrumbs__link { color: var(--poker-chip-50); background: var(--poker-bg-raised); }

/* TOC */
.table-of-contents__link                  { color: var(--poker-text-muted); }
.table-of-contents__link:hover            { color: var(--poker-chip-100); }
.table-of-contents__link--active          { color: var(--poker-gold-400); font-weight: 600; }

/* Tabs */
.tabs__item                  { color: var(--poker-chip-200); }
.tabs__item--active          { color: var(--poker-chip-50); border-bottom-color: var(--poker-gold-500); }

/* DocSearch modal */
.DocSearch-Modal             { background: var(--poker-ink-800); border: 1px solid var(--poker-border); }
.DocSearch-SearchBar         { background: var(--poker-ink-900); }
.DocSearch-Hit-source        { color: var(--poker-gold-400); }
.DocSearch-Hit--Result       { background: var(--poker-ink-700); }
.DocSearch-Hit-title mark    { color: var(--poker-gold-300); background: transparent; }
```

---

## 6. Do / don't

### ✅ Do

- Use **semantic aliases** (`--poker-bg`, `--poker-text`, `--poker-primary`)
  in components. Only reach for raw scales (`--poker-felt-500`) when the
  semantic alias genuinely doesn't fit.
- Reserve **gold** for moments that should reward attention: the
  primary CTA, the version badge, an active TOC item, a single eyebrow
  per section.
- Use **felt green** for the *secondary* accent (success, prompts, code
  numbers, secondary outline buttons).
- Use **suit red** for things that are literally a red suit, for code
  keywords, or for danger. Never for primary CTAs.
- Use **cream (`chip-50`)** for headings and primary copy. It is warmer
  than pure white and pairs better with gold + felt.
- Use `border-left: 3px solid var(--poker-gold-500)` as the standard
  "this is an important block" treatment (code, signatures, callouts).
- Use small `rgba()` tints of the brand hues for subtle backgrounds.
  Suggested alphas: `0.08` (very subtle), `0.10` (subtle), `0.14`
  (noticeable highlight), `0.22` (border-on-dark), `0.35` (focus glow).

### ❌ Don't

- **Don't introduce new accent hues.** No blues, purples, teals, oranges.
- **Don't use pure `#000` or pure `#fff`.** Use `--poker-ink-900` and
  `--poker-chip-50`.
- **Don't put cream text on gold backgrounds.** Use `--poker-ink-900`
  on gold for contrast.
- **Don't put gold on felt green.** They will mud-out. Always separate
  with an ink surface.
- **Don't use red as a primary brand color.** Red is danger / suit /
  syntax only.
- **Don't hard-code hex values in `.module.css` or component code.**
  All hex should live in `:root`. The only exceptions are inline
  `rgba()` tints of brand colors where the alpha varies.
- **Don't override `--ifm-color-primary` per-page.** It is gold, site-wide.
- **Don't add drop shadows with saturated brand color** at high alpha.
  Use `rgba(0, 0, 0, 0.x)` for depth; only use gold-tinted shadow
  (`rgba(212, 175, 55, 0.35–0.55)`) on the primary CTA at hover.

---

## 7. Contrast & accessibility

All combinations below meet **WCAG AA** for normal text (≥ 4.5:1) or
**WCAG AA Large** for ≥ 18pt text (≥ 3:1). Verify with a checker
before approving new combos.

| Foreground          | Background          | Ratio    | Pass         |
| ------------------- | ------------------- | -------- | ------------ |
| `chip-50` (#f5f1e8) | `ink-900` (#0a0e0c) | ~16.4:1  | AAA          |
| `chip-100`          | `ink-900`           | ~14.7:1  | AAA          |
| `chip-200`          | `ink-900`           | ~11.5:1  | AAA          |
| `chip-300`          | `ink-900`           | ~6.4:1   | AA           |
| `gold-300`          | `ink-900`           | ~12.1:1  | AAA          |
| `gold-400`          | `ink-900`           | ~10.6:1  | AAA          |
| `gold-500`          | `ink-900`           | ~8.4:1   | AAA          |
| `felt-300`          | `ink-900`           | ~6.0:1   | AA           |
| `red-400`           | `ink-900`           | ~5.3:1   | AA           |
| `ink-900`           | `gold-500`          | ~8.4:1   | AAA (button) |
| `ink-900`           | `gold-400`          | ~10.6:1  | AAA (button) |
| `chip-50`           | `felt-600` (#0e6b3a)| ~5.9:1   | AA           |

**Combos to avoid:**

- `chip-300` on `ink-700` — borderline ~4.0:1, only for tiny non-essential
  captions (do not use for body copy).
- `felt-500` on `ink-900` — ~4.6:1, OK but only use for icons/borders,
  not body text.
- `gold-500` on `felt-600` — *fails* (~2.0:1). Always separate gold
  from felt with an ink layer.
- Pure white on gold — visually flat; use ink-900 on gold for buttons.

---

## 8. Spacing, radius, depth (related conventions)

For consistency with the landing page, keep these defaults during the
site sweep:

- **Radius:**
  - `--ifm-global-radius: 10px` (cards, buttons, code blocks).
  - 12px for the install pill and the hero badge.
  - 999px (pill) for badges and "uppercase tag" chips.
- **Border weight:** always `1px` for hairlines, `2px` for active tab
  underlines, `3px` for left-rule accents on code blocks and signatures.
- **Shadows:**
  - Default surface: none (rely on border + bg contrast).
  - Hover on card: `0 14px 32px -16px rgba(0, 0, 0, 0.8)`.
  - Primary CTA: `0 10px 24px -10px rgba(212, 175, 55, 0.45)` rising
    to `0 16px 30px -12px rgba(212, 175, 55, 0.55)` on hover.

---

## 9. How to verify your sweep

1. `pnpm --filter poker-calculations-website start` and walk every doc
   page. Look for any element still using the old `#cc0000` red as a
   primary, any `#083fd1` blue (now gold), or pure white text.
2. `rg -n "#[0-9a-fA-F]{3,8}" Website/src` — confirm the only hits are
   inside `:root` of `custom.css` (and any `rgba()` brand tints with
   variable alpha).
3. `rg -n "--poker-(white|black|red|gray|blue|muted)\b" Website` —
   should be empty *after* your sweep, before you delete the legacy
   aliases.
4. Open Lighthouse → Accessibility. Color-contrast section should be
   green on every doc page.
5. Toggle the search modal, every admonition variant, a code block
   with `highlighted lines`, and a `<Tabs>` block. All should feel
   like one design.

---

## 10. Quick reference: "if you only remember one thing"

```
Background = ink-900           Primary CTA = gold-500 on ink-900
Surface    = ink-700           Secondary CTA = outlined felt-500
Border     = ink-500           Link        = gold-400 → gold-300 hover
Text       = chip-50           Danger      = red-600
Muted      = chip-300          Success     = felt-500
Accent     = gold-500          Suit ♥/♦     = red-600
                                Suit ♠/♣     = chip-50 (on dark) / ink-900 (on white card)
```

That's the whole system. Keep it spare, keep it warm, keep the gold rare.
