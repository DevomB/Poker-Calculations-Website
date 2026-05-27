import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {createRequire} from 'node:module';

const require = createRequire(__filename);
const npmPkg = require('poker-calculations/package.json') as {
  version: string;
  name: string;
};

const config: Config = {
  title: 'Poker Calculations',
  tagline: 'NL Hold’em engine, equity, and chip math for Node.js',
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
    image: 'img/social-card.svg',
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
          title: 'Documentation',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'API Reference', to: '/docs/reference/api'},
            {label: 'Installation', to: '/docs/getting-started/installation'},
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
              label: 'GitHub',
              href: 'https://github.com/DevomB/Poker-Calculations',
            },
          ],
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
          'Official documentation for poker-calculations: hand evaluation, Monte Carlo equity, decideAction, pot odds, ICM, and more.',
      },
      {name: 'keywords', content: 'poker, holdem, equity, ICM, node, npm'},
    ],
  } satisfies Preset.ThemeConfig,

  customFields: {
    packageVersion: npmPkg.version,
  },
};

export default config;
