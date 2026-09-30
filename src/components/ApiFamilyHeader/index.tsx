import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Props = {
  category: string;
  suit: '♠' | '♥' | '♦' | '♣';
  functions: string[];
};

const RED = new Set(['♥', '♦']);

/** Top of every API family page: category chip plus a jump list of the functions on the page. */
export default function ApiFamilyHeader({category, suit, functions}: Props): React.ReactNode {
  return (
    <div className={styles.header}>
      <span className={styles.category}>
        <span className={RED.has(suit) ? styles.suitRed : styles.suitBlack} aria-hidden>
          {suit}
        </span>
        {category}
      </span>
      {functions.length > 1 ? (
        <nav className={styles.jump} aria-label="Functions on this page">
          {functions.map((fn) => (
            <Link key={fn} className={styles.fn} to={`#${fn}`}>
              {fn}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
