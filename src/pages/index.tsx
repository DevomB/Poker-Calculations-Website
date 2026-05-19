import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const taglineParts = siteConfig.tagline.split(' — ');
  const lead = taglineParts[0] ?? siteConfig.tagline;
  const rest = taglineParts.slice(1).join(' — ') || null;

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroTexture} aria-hidden />
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          <span className={styles.heroSubtitleLead}>{lead}</span>
          {rest ? (
            <>
              <span className={styles.heroSubtitleSep}> — </span>
              <span className={styles.heroSubtitleRest}>{rest}</span>
            </>
          ) : null}
        </p>
        <p className={styles.heroStats} aria-label="Package highlights">
          <span>96 API exports</span>
          <span className={styles.heroStatsDot} aria-hidden>
            ·
          </span>
          <span>N-API</span>
          <span className={styles.heroStatsDot} aria-hidden>
            ·
          </span>
          <span>Node 18+</span>
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get started
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/api">
            API reference
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="NL hold'em math for Node: hand evaluation, Monte Carlo and exact equity, pot and rake math, ICM, side pots, and 96 documented API exports.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
