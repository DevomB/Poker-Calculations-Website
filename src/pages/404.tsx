import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './404.module.css';

export default function NotFound(): React.ReactNode {
  return (
    <Layout
      title="Page not found"
      description="That page is not in the deck.">
      <main className={styles.wrap}>
        <section className={styles.card} aria-labelledby="not-found-title">
          <p className={styles.eyebrow}>Folded</p>
          <h1 id="not-found-title" className={styles.code}>404</h1>
          <p className={styles.body}>
            That page is not in the deck. Reshuffle and try one of the routes
            below.
          </p>
          <div className={styles.actions}>
            <Link className={styles.btnGhost} to="/">
              Back home
            </Link>
            <Link className={styles.btnSecondary} to="/docs/reference/api">
              API reference <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
