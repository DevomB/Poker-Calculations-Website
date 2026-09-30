import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import RunItOut from '@site/src/components/RunItOut';
import ApiCatalog from '@site/src/components/ApiCatalog';
import {useDownloads, formatCount} from '@site/src/components/useDownloads';
import {apiFunctionCount} from '@site/src/data/api';
import styles from './index.module.css';

// Each snippet's output was produced by running it against the package.
const SHOWCASE = [
  {
    tab: 'Equity',
    code: `// A♥K♥ with two draws vs a set of queens
const hero = ['Ah', 'Kh'];
const villain = ['Qs', 'Qd'];
const board = ['Qh', 'Jh', '2c'];

poker.exactHuEquityVsKnownHand(hero, villain, board).toFixed(4);`,
    out: "'0.3384'",
  },
  {
    tab: 'Call or fold',
    code: `// Villain bets 60 into 90: 150 in the middle, 60 to call
poker.breakevenCallEquity(150, 60).toFixed(3);     // needed
poker.expectedValueCall(0.33, 150, 60).toFixed(1); // EV at 33%`,
    out: "'0.286'\n'9.3'",
  },
  {
    tab: 'ICM',
    code: `const stacks = [6000, 3000, 1000];
const prizes = [500, 300, 200];

poker.icmExpectedPayouts(stacks, prizes).map(Math.round);`,
    out: '[ 412, 338, 249 ]',
  },
  {
    tab: 'Omaha',
    code: `// K-Q-9-8 on a J-T-2 flop: how big is the wrap?
const hand = ['Kh', 'Qd', '9c', '8s'];
const flop = ['Jd', 'Tc', '2h'];

poker.omahaWrapDrawOuts(hand, flop);`,
    out: '{ outs: 20, nutOuts: 14 }',
  },
  {
    tab: 'Push/fold',
    code: `// Heads-up at 10 big blinds: how often to jam and call
const { jam, call } = poker.nashHeadsUpJamCallSolve({
  stackBb: 10,
  equityIterations: 60,
});
const share = (v) => (v.reduce((a, b) => a + b) / 169).toFixed(2);
[share(jam), share(call)];`,
    out: "[ '0.71', '0.41' ]",
  },
];

const TRUST = [
  {
    title: 'Every example runs',
    body: 'Each code block on this site is executed against the package before a deploy. The output under it is what it printed.',
  },
  {
    title: 'Swept for crashes',
    body: 'Every export is called with 17 kinds of broken input: 6,256 calls, zero crashes. Bad input throws an ordinary Error.',
  },
  {
    title: 'Checked against brute force',
    body: 'The fast evaluator is tested against a reference evaluator and exhaustive enumeration, so equity is exact where it says exact.',
  },
];

function Showcase() {
  const [active, setActive] = useState(0);
  const item = SHOWCASE[active];
  return (
    <div className={styles.showcase}>
      <div className={styles.tabs} role="tablist" aria-label="Examples">
        {SHOWCASE.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={clsx(styles.tab, i === active && styles.tabActive)}
            onClick={() => setActive(i)}>
            {s.tab}
          </button>
        ))}
      </div>
      <div className={styles.showcaseBody}>
        <CodeBlock language="js">{`const poker = require('poker-calculations');\n\n${item.code}`}</CodeBlock>
        <div className={styles.output}>
          <span className={styles.outputLabel}>Output</span>
          <pre>{item.out}</pre>
        </div>
      </div>
    </div>
  );
}

function CopyInstall() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install poker-calculations';
  return (
    <button
      type="button"
      className={styles.install}
      onClick={() => {
        navigator.clipboard?.writeText(cmd).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      aria-label="Copy install command">
      <span className={styles.prompt}>$</span>
      <code>{cmd}</code>
      <span className={styles.copy}>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields as {packageVersion?: string; downloads?: number};
  const downloads = useDownloads(fields.downloads ?? 0);

  return (
    <Layout
      description="poker-calculations: exact and Monte Carlo equity, pot odds, ICM, solvers, and eight poker variants, in C++ with prebuilt binaries for Node.js.">
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={clsx('container', styles.heroGrid)}>
          <div className={styles.heroCopy}>
            {fields.packageVersion ? (
              <Link to="https://github.com/DevomB/Poker-Calculations/blob/main/CHANGELOG.md" className={styles.badge}>
                <span className={styles.badgeDot} />v{fields.packageVersion} · {apiFunctionCount} functions
              </Link>
            ) : null}
            <h1 className={styles.title}>
              Poker math, <em>solved.</em>
            </h1>
            <p className={styles.subtitle}>
              Exact and Monte Carlo equity, pot odds, ICM, bounties, solvers, and eight poker variants. Written in
              C++20, shipped as prebuilt binaries, called from plain JavaScript.
            </p>
            <CopyInstall />
            <div className={styles.ctas}>
              <Link className={styles.primary} to="/docs/getting-started/quick-start">
                Quick start
              </Link>
              <Link className={styles.ghost} to="/docs/reference/api">
                Browse the API <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroDemo}>
            <RunItOut />
          </div>
        </div>
      </header>

      <main>
        <section className={styles.stats} aria-label="At a glance">
          <div className={clsx('container', styles.statsRow)}>
            <div>
              <strong>{apiFunctionCount}</strong>
              <span>functions</span>
            </div>
            <div>
              <strong>8</strong>
              <span>poker variants</span>
            </div>
            <div>
              <strong>9</strong>
              <span>prebuilt platforms</span>
            </div>
            <div>
              <strong>{formatCount(downloads)}</strong>
              <span>npm downloads</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={clsx('container', styles.split)}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Ask it anything</p>
              <h2 className={styles.h2}>One function call per question.</h2>
              <p className={styles.lead}>
                Equity against a hand or a range, the price of a call, what a stack is worth at a final table, how many
                outs a wrap has, where the push/fold line sits. Each answer is a single synchronous call, or an async one
                that stays off your event loop.
              </p>
              <Link className={styles.textLink} to="/docs/guides">
                Walk through the guides <span aria-hidden>→</span>
              </Link>
            </div>
            <Showcase />
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <p className={styles.eyebrow}>The whole deck</p>
            <h2 className={styles.h2}>Organized by what you are trying to do.</h2>
            <ApiCatalog compact />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <p className={styles.eyebrow}>Checked, not claimed</p>
            <h2 className={styles.h2}>Numbers you can put in front of players.</h2>
            <div className={styles.trust}>
              {TRUST.map((t, i) => (
                <div key={t.title} className={styles.trustItem}>
                  <span className={styles.trustSuit} aria-hidden>
                    {['♠', '♥', '♦'][i]}
                  </span>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className={clsx('container', styles.built)}>
            <Link to="https://geometry-of-poker.devomb.com" className={styles.builtShot}>
              <img
                src={require('@site/static/img/geometry-of-poker.jpg').default}
                alt="Geometry of Poker: 25,000 flop states as a 3D point cloud colored by equity"
                width={832}
                height={520}
                loading="lazy"
              />
            </Link>
            <div className={styles.builtCopy}>
              <p className={styles.eyebrow}>Built with poker-calculations</p>
              <h2 className={styles.h2}>Geometry of Poker</h2>
              <p className={styles.lead}>
                Tens of thousands of Hold'em situations, each described by features computed with this package and laid
                out in 3D so similar spots sit together. Fly through a street, color it by equity, and click any point to
                see why it landed there.
              </p>
              <Link className={styles.textLink} to="https://geometry-of-poker.devomb.com">
                Open the map <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <div className="container">
            <h2 className={styles.closingTitle}>Deal yourself in.</h2>
            <CopyInstall />
            <div className={styles.ctas}>
              <Link className={styles.primary} to="/docs/intro">
                Read the docs
              </Link>
              <Link className={styles.ghost} to="https://github.com/DevomB/Poker-Calculations">
                GitHub <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
