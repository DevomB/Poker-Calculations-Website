import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {apiSections, categoryUrl, functionCount} from '@site/src/data/api';
import styles from './styles.module.css';

const RED = new Set(['♥', '♦']);

/** The API grouped into its seven sections, each category linking to its index page. */
export default function ApiCatalog({compact = false}: {compact?: boolean}): React.ReactNode {
  return (
    <div className={clsx(styles.catalog, compact && styles.compact)}>
      {apiSections.map((section) => (
        <section key={section.title} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <div className={styles.grid}>
            {section.categories.map((cat) => (
              <Link key={cat.slug} to={categoryUrl(cat)} className={styles.card}>
                <span className={clsx(styles.suit, RED.has(cat.suit) ? styles.red : styles.black)} aria-hidden>
                  {cat.suit}
                </span>
                <span className={styles.body}>
                  <span className={styles.titleRow}>
                    <span className={styles.title}>{cat.title}</span>
                    <span className={styles.count}>{functionCount(cat)}</span>
                  </span>
                  {compact ? null : <span className={styles.blurb}>{cat.blurb}</span>}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
