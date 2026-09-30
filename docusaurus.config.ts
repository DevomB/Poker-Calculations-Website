import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const require = createRequire(__filename);
const pokerPkgRoot = path.dirname(require.resolve('poker-calculations'));
const npmPkg = require(path.join(pokerPkgRoot, 'package.json')) as {
  version: string;
  name: string;
};

const downloadsPath = path.join(__dirname, 'src/data/downloads.json');
// All-time npm downloads at build time; the homepage refreshes it live in the browser.
let downloads = 0;
try {
  downloads = (JSON.parse(fs.readFileSync(downloadsPath, 'utf8')) as {total?: number}).total ?? 0;
} catch {
  // missing file: the homepage fetches the number itself
}

const config: Config = {
  title: 'Poker Calculations Documentation',
  tagline: 'Poker math for Node.js: equity, pot odds, ICM, solvers, and eight variants',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://poker-calculations.devomb.com',
  baseUrl: '/',

  organizationName: 'DevomB',
  projectName: 'Poker-Calculations',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'vercel-analytics',
      {
        mode: 'auto',
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: 'docs',
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      title: 'Poker Calculations',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/reference/api',
          label: 'API',
          position: 'left',
        },
        {
          to: '/docs/guides',
          label: 'Guides',
          position: 'left',
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
        {type: 'search', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Quick start', to: '/docs/getting-started/quick-start'},
            {label: 'Guides', to: '/docs/guides'},
            {label: 'API reference', to: '/docs/reference/api'},
            {label: 'Types', to: '/docs/reference/types'},
          ],
        },
        {
          title: 'Package',
          items: [
            {label: 'npm', href: 'https://www.npmjs.com/package/poker-calculations'},
            {label: 'GitHub', href: 'https://github.com/DevomB/Poker-Calculations'},
            {label: 'Changelog', href: 'https://github.com/DevomB/Poker-Calculations/blob/main/CHANGELOG.md'},
          ],
        },
        {
          title: 'More',
          items: [{label: 'Geometry of Poker', href: 'https://geometry-of-poker.devomb.com'}],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Poker Calculations · v${npmPkg.version}`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash'],
    },
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for poker-calculations: exact and Monte Carlo equity, pot odds, ICM, bounties, solvers, and eight poker variants for Node.js.',
      },
      {name: 'keywords', content: 'poker, holdem, equity, ICM, node, npm'},
    ],
  } satisfies Preset.ThemeConfig,

  customFields: {
    packageVersion: npmPkg.version,
    downloads,
  },
};

export default config;
