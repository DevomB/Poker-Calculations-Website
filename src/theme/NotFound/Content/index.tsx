import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/** Body of every 404 (the theme renders it for any unknown route). */
export default function NotFoundContent(): React.ReactNode {
  return (
    <main className={styles.wrap}>
      <section className={styles.card} aria-labelledby="not-found-title">
        <p className={styles.eyebrow}>Folded</p>
        <h1 id="not-found-title" className={styles.code}>
          404
        </h1>
        <p className={styles.body}>
          That page is not in the deck. The API reference was reorganized in 4.0, so an old link may point to a page
          that moved or a function that was removed.
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
  );
}
