import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';
import {
  apiReferenceCategories,
  apiReferenceTotalExports,
} from '@site/src/data/api-reference';

type Suit = (typeof apiReferenceCategories)[number]['suit'];

const apiCategories = apiReferenceCategories;
const totalExports = apiReferenceTotalExports;

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
    body: 'ICM (Harville and Weitzman), decideAction bots, Chubukov jam study helpers, and preflop equity matrices.',
    to: '/docs/guides/decide-action',
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

function CategorySuitIcon({suit}: {suit: Suit}) {
  switch (suit) {
    case '♠':
      return (
        <svg className={styles.categorySuitIcon} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3s-7 5.1-8.6 8.2c-1.3 2.5.1 5.4 2.9 5.4 1.5 0 2.7-.8 3.6-2-.1 1.8-.8 3.5-2.1 5.4h8.4c-1.3-1.9-2-3.6-2.1-5.4.9 1.2 2.1 2 3.6 2 2.8 0 4.2-2.9 2.9-5.4C19 8.1 12 3 12 3z" />
        </svg>
      );
    case '♥':
      return (
        <svg className={styles.categorySuitIcon} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 21s-7-4.4-9.4-8.7C.7 9.3 1.5 5.5 4.5 4.2 6.7 3.3 9 4 12 6.8c3-2.8 5.3-3.5 7.5-2.6 3 1.3 3.8 5.1 1.9 8.1C19 16.6 12 21 12 21z" />
        </svg>
      );
    case '♦':
      return (
        <svg className={styles.categorySuitIcon} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2.5 19.5 12 12 21.5 4.5 12 12 2.5z" />
        </svg>
      );
    case '♣':
      return (
        <svg className={styles.categorySuitIcon} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3.5a4.1 4.1 0 0 0-2.2 7.6A4.1 4.1 0 1 0 8.5 18c1.2 0 2.3-.5 3.1-1.3-.2 1.4-.8 2.7-1.9 4.3h4.6c-1.1-1.6-1.7-2.9-1.9-4.3.8.8 1.9 1.3 3.1 1.3a4.1 4.1 0 1 0-1.3-6.9A4.1 4.1 0 0 0 12 3.5z" />
        </svg>
      );
  }
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as {
    packageVersion?: string;
    downloadsFormatted?: string;
  };
  const version = customFields?.packageVersion ?? '';
  const downloadsFormatted = customFields?.downloadsFormatted ?? '1.6k';

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
            <span className={styles.heroInstallHint}>library: Node 18+</span>
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
              <strong>{downloadsFormatted}</strong>
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
              {apiCategories.map((c) => (
                <Link key={c.to} to={c.to} className={styles.categoryCard}>
                  <span
                    className={clsx(
                      styles.categorySuit,
                      c.suit === '♥' || c.suit === '♦'
                        ? styles.featureSuitRed
                        : styles.featureSuitDark,
                    )}
                    aria-hidden>
                    <CategorySuitIcon suit={c.suit} />
                  </span>
                  <h3 className={styles.categoryTitle}>{c.title}</h3>
                  <p className={styles.categoryCount}>
                    {c.count} function{c.count === 1 ? '' : 's'}
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
