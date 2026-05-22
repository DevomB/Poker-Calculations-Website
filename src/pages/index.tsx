import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const categories = [
  {title: 'Hands & equity', to: '/docs/reference/api/hands-and-equity', count: 11},
  {title: 'Monte Carlo', to: '/docs/reference/api/monte-carlo', count: 4},
  {title: 'Strategy', to: '/docs/reference/api/strategy', count: 1},
  {title: 'Pot & EV', to: '/docs/reference/api/pot-and-ev', count: 12},
  {title: 'Stacks & display', to: '/docs/reference/api/stacks-and-display', count: 14},
  {title: 'Heuristics & draws', to: '/docs/reference/api/heuristics-and-draws', count: 14},
  {title: 'ICM', to: '/docs/reference/api/icm', count: 6},
  {title: 'Side pots', to: '/docs/reference/api/side-pots', count: 3},
];

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const version =
    (siteConfig.customFields as {packageVersion?: string})?.packageVersion ?? '';

  return (
    <Layout
      title="Poker Calculations"
      description="Official documentation for the poker-calculations npm package.">
      <header className={`hero ${styles.hero}`}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {version ? (
            <p className={styles.version}>Package v{version}</p>
          ) : null}
          <pre className={styles.install}>
            <code>npm install poker-calculations</code>
          </pre>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Read the docs
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/reference/api">
              API reference
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--xl">
        <h2 className={styles.gridTitle}>API by category</h2>
        <div className="row">
          {categories.map((c) => (
            <div key={c.to} className="col col--6 col--4--tablet margin-bottom--lg">
              <Link to={c.to} className="categoryCard">
                <h3>{c.title}</h3>
                <p>{c.count} exports</p>
              </Link>
            </div>
          ))}
        </div>
        <p className={styles.more}>
          <Link to="/docs/reference/api">View all 98 functions →</Link>
        </p>
      </main>
    </Layout>
  );
}
