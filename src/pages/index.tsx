import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

type Suit = '♠' | '♥' | '♦' | '♣';

const apiCategories: Array<{title: string; to: string; count: number; suit: Suit}> = [
  {title: 'Hands & equity', to: '/docs/reference/api/hands-and-equity', count: 13, suit: '♠'},
  {title: 'Monte Carlo', to: '/docs/reference/api/monte-carlo', count: 11, suit: '♥'},
  {title: 'Strategy', to: '/docs/reference/api/strategy', count: 4, suit: '♣'},
  {title: 'Pot & EV', to: '/docs/reference/api/pot-and-ev', count: 11, suit: '♦'},
  {title: 'Stacks & display', to: '/docs/reference/api/stacks-and-display', count: 15, suit: '♠'},
  {title: 'Heuristics & draws', to: '/docs/reference/api/heuristics-and-draws', count: 14, suit: '♥'},
  {title: 'Reverse implied', to: '/docs/reference/api/reverse-implied', count: 2, suit: '♣'},
  {title: 'Statistics & risk', to: '/docs/reference/api/statistics-and-risk', count: 9, suit: '♦'},
  {title: 'Kelly & jam', to: '/docs/reference/api/kelly-and-jam', count: 6, suit: '♠'},
  {title: 'GTO frequencies', to: '/docs/reference/api/gto-frequencies', count: 3, suit: '♥'},
  {title: 'Sizing & commitment', to: '/docs/reference/api/sizing-and-commitment', count: 3, suit: '♣'},
  {title: 'Fold equity', to: '/docs/reference/api/fold-equity', count: 8, suit: '♦'},
  {title: 'Multiway', to: '/docs/reference/api/multiway', count: 2, suit: '♠'},
  {title: 'ICM', to: '/docs/reference/api/icm', count: 6, suit: '♥'},
  {title: 'Side pots', to: '/docs/reference/api/side-pots', count: 3, suit: '♣'},
];

const homepageCategoryPaths = [
  '/docs/reference/api/hands-and-equity',
  '/docs/reference/api/monte-carlo',
  '/docs/reference/api/strategy',
  '/docs/reference/api/pot-and-ev',
  '/docs/reference/api/stacks-and-display',
  '/docs/reference/api/heuristics-and-draws',
  '/docs/reference/api/icm',
  '/docs/reference/api/side-pots',
] as const;

const categoryByPath = new Map(apiCategories.map((c) => [c.to, c]));
const homepageCategories = homepageCategoryPaths.map((to) => categoryByPath.get(to)!);
const totalExports = apiCategories.reduce((sum, c) => sum + c.count, 0);

const features: Array<{suit: Suit; title: string; body: string; to: string}> = [
  {
    suit: '♠',
    title: 'Hand evaluation',
    body: 'Rank 5- and 7-card hands, compare equities, and resolve showdowns in microseconds.',
    to: '/docs/reference/api/hands-and-equity',
  },
  {
    suit: '♥',
    title: 'Monte Carlo equity',
    body: 'Run hundreds of thousands of trials to estimate win, tie, and lose probabilities.',
    to: '/docs/reference/api/monte-carlo',
  },
  {
    suit: '♦',
    title: 'Pot & EV math',
    body: 'Pot odds, expected value, implied odds — turn the math into your edge.',
    to: '/docs/reference/api/pot-and-ev',
  },
  {
    suit: '♣',
    title: 'ICM & strategy',
    body: 'Tournament-aware decision tooling: ICM, push/fold ranges, and stack-aware EV.',
    to: '/docs/reference/api/icm',
  },
];

function PlayingCard({
  rank,
  suit,
  className,
}: {
  rank: string;
  suit: Suit;
  className?: string;
}) {
  const isRed = suit === '♥' || suit === '♦';
  return (
    <div
      className={clsx(
        styles.card,
        isRed ? styles.cardRed : styles.cardBlack,
        className,
      )}
      aria-hidden>
      <span className={styles.cardRankTop}>{rank}</span>
      <span className={styles.cardSuit}>{suit}</span>
      <span className={styles.cardRankBottom}>{rank}</span>
    </div>
  );
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as {
    packageVersion?: string;
    npmDownloadsFormatted?: string;
  };
  const version = customFields?.packageVersion ?? '';
  const npmDownloadsFormatted = customFields?.npmDownloadsFormatted ?? '1.6k';

  return (
    <Layout
      title="Poker Calculations"
      description="Official documentation for the poker-calculations npm package.">
      {/* ============================== HERO ============================== */}
      <header className={styles.hero}>
        <div className={styles.heroFelt} aria-hidden />
        <div className={styles.heroVignette} aria-hidden />
        <div className={styles.heroStitch} aria-hidden />

        <PlayingCard rank="A" suit="♠" className={styles.cardFloatLeft} />
        <PlayingCard rank="K" suit="♥" className={styles.cardFloatLeftBack} />
        <PlayingCard rank="Q" suit="♦" className={styles.cardFloatRight} />
        <PlayingCard rank="J" suit="♣" className={styles.cardFloatRightBack} />

        <div className={clsx('container', styles.heroInner)}>
          {version ? (
            <span className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              poker-calculations · v{version}
            </span>
          ) : null}

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>Poker math,</span>{' '}
            <span className={styles.heroTitleAccent}>solved.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            A fast, dependency-free Node.js library for No-Limit Hold&rsquo;em equity,
            Monte&nbsp;Carlo simulation, pot odds, ICM, and tournament strategy.
          </p>

          <div className={styles.heroInstall}>
            <span className={styles.heroInstallPrompt}>$</span>
            <code>npm install poker-calculations</code>
            <span className={styles.heroInstallHint}>node ≥ 20</span>
          </div>

          <div className={styles.heroCtas}>
            <Link className={styles.btnPrimary} to="/docs/intro">
              Read the docs
            </Link>
            <Link className={styles.btnGhost} to="/docs/reference/api">
              API reference <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className={styles.heroStats}>
            <li>
              <strong>{totalExports}</strong>
              <span>functions</span>
            </li>
            <li>
              <strong>0</strong>
              <span>dependencies</span>
            </li>
            <li>
              <strong>{npmDownloadsFormatted}</strong>
              <span>Downloads</span>
            </li>
            <li>
              <strong>MIT</strong>
              <span>licensed</span>
            </li>
          </ul>
        </div>
      </header>

      <main>
        {/* ============================ FEATURES ============================ */}
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionEyebrow}>What&rsquo;s in the deck</p>
            <h2 className={styles.sectionTitle}>
              Everything you need to ship a poker brain.
            </h2>

            <div className={styles.featureGrid}>
              {features.map((f) => (
                <Link key={f.to} to={f.to} className={styles.featureCard}>
                  <span
                    className={clsx(
                      styles.featureSuit,
                      f.suit === '♥' || f.suit === '♦'
                        ? styles.featureSuitRed
                        : styles.featureSuitDark,
                    )}
                    aria-hidden>
                    {f.suit}
                  </span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureBody}>{f.body}</p>
                  <span className={styles.featureCta}>
                    Explore <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================== QUICK START =========================== */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.quickStart}>
              <div>
                <p className={styles.sectionEyebrow}>30-second sample</p>
                <h2 className={styles.sectionTitle}>
                  From cards to expected value in three lines.
                </h2>
                <p className={styles.quickStartBody}>
                  Compose a hero range against a board, run a fast Monte Carlo, and
                  feed the result straight into <code>decideAction</code>.
                </p>
                <Link className={styles.btnPrimary} to="/docs/getting-started/installation">
                  Get started
                </Link>
              </div>
              <pre className={styles.codeBlock} aria-label="Example usage">
                <code>
                  <span className={styles.codeComment}>{`// Equity vs. random villain on the flop`}</span>
                  {`\n`}
                  <span className={styles.codeKeyword}>const</span>
                  {` poker = `}
                  <span className={styles.codeFunc}>require</span>
                  {`(`}
                  <span className={styles.codeString}>{`'poker-calculations'`}</span>
                  {`);\n\n`}
                  <span className={styles.codeKeyword}>const</span>
                  {` equity = poker.`}
                  <span className={styles.codeFunc}>simulateHandOutcome</span>
                  {`(\n  [`}
                  <span className={styles.codeString}>{`'As'`}</span>
                  {`, `}
                  <span className={styles.codeString}>{`'Ks'`}</span>
                  {`],\n  [`}
                  <span className={styles.codeString}>{`'Qd'`}</span>
                  {`, `}
                  <span className={styles.codeString}>{`'Jh'`}</span>
                  {`, `}
                  <span className={styles.codeString}>{`'2c'`}</span>
                  {`],\n  `}
                  <span className={styles.codeNumber}>50_000</span>
                  {`,\n  `}
                  <span className={styles.codeNumber}>42</span>
                  {`,\n);\n\n`}
                  <span className={styles.codeComment}>{`// → 0.71 (estimated win rate)`}</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ============================ CATEGORIES ============================ */}
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionEyebrow}>Reference</p>
            <h2 className={styles.sectionTitle}>API by category.</h2>

            <div className={styles.categoryGrid}>
              {homepageCategories.map((c) => (
                <Link key={c.to} to={c.to} className={styles.categoryCard}>
                  <span
                    className={clsx(
                      styles.categorySuit,
                      c.suit === '♥' || c.suit === '♦'
                        ? styles.featureSuitRed
                        : styles.featureSuitDark,
                    )}
                    aria-hidden>
                    {c.suit}
                  </span>
                  <h3 className={styles.categoryTitle}>{c.title}</h3>
                  <p className={styles.categoryCount}>
                    {c.count} export{c.count === 1 ? '' : 's'}
                  </p>
                </Link>
              ))}
            </div>

            <p className={styles.viewAll}>
              <Link to="/docs/reference/api">View all {totalExports} functions →</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
