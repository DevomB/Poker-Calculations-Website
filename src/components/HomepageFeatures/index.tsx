import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Hand evaluation',
    Svg: require('@site/static/img/feature-hand.svg').default,
    description: (
      <>
        Best five of up to seven cards, strength encoding, categories, and card
        parsing helpers — see{' '}
        <Link to="/docs/api/hand-evaluation/evaluate-best-hand">
          <code>evaluateBestHand</code>
        </Link>{' '}
        and related docs.
      </>
    ),
  },
  {
    title: 'Equity (MC + exact)',
    Svg: require('@site/static/img/feature-equity.svg').default,
    description: (
      <>
        Monte Carlo vs random villains, threaded simulation, and exact HU equity
        on a fixed board — start with{' '}
        <Link to="/docs/api/monte-carlo-equity/simulate-hand-outcome">
          <code>simulateHandOutcome</code>
        </Link>
        .
      </>
    ),
  },
  {
    title: 'Chips, ICM, side pots',
    Svg: require('@site/static/img/feature-chips.svg').default,
    description: (
      <>
        Pot odds, rake-aware breakevens, Harrington metrics, Harville ICM, and
        side-pot ladders — browse{' '}
        <Link to="/docs/api">
          <strong>API reference</strong>
        </Link>
        .
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIconWrap}>
          <Svg className={styles.featureSvg} role="img" aria-hidden />
        </div>
        <div className={styles.featureBody}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureText}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
