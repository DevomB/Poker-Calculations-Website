import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import prismVelvet from './src/theme/prism-velvet';
import prismMidnight from './src/theme/prism-midnight';

/**
 * Docusaurus merges presets, themes, and defaults into `.docusaurus/docusaurus.config.mjs`
 * on `pnpm start` / `pnpm run build`. Inspect that file (and `globalData.json`) when unsure
 * about final plugin options, doc IDs for `navbar.docId`, or resolved paths.
 */
const config: Config = {
  title: 'Poker Calculations',
  tagline: "NL hold'em math for Node — hand evaluation, equity, ICM, pot geometry, and more (N-API + C++).",
  favicon: 'img/logo.svg',

  url: 'https://poker-calculator.devomb.com',
  baseUrl: '/',
  /** Matches emitted HTML paths so local search indexes docs (undefined trailingSlash broke route ↔ permalink matching). */
  trailingSlash: false,

  organizationName: 'DevomB',
  projectName: 'Poker-Calculations',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/DevomB/Poker-Calculations/tree/main/Website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Local search ships as a *theme* (not a plugin). See upstream README and
  // `.docusaurus/docusaurus.config.mjs` after `pnpm run build` for the merged config.
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // `hashed: true` caused ENOENT on `build/search-index.json` mid-build (Docusaurus 3.10.1).
        // Merged options appear under `.docusaurus/docusaurus.config.mjs` after `pnpm run build`.
        hashed: false,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: 'docs',
        highlightSearchTermsOnTargetPage: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Poker Calculations',
      logo: {
        alt: 'Poker Calculations',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'api/index',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://www.npmjs.com/package/poker-calculations',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/DevomB/Poker-Calculations',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'API reference',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'Package',
          items: [
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/poker-calculations',
            },
            {
              label: 'Source',
              href: 'https://github.com/DevomB/Poker-Calculations',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Poker Calculations. Built with Docusaurus.`,
    },
    prism: {
      theme: prismVelvet,
      darkTheme: prismMidnight,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
