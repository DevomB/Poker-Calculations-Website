import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import heroHands from '@site/src/data/hero-hands.json';
import styles from './styles.module.css';

type Street = {name: string; cards: number; equity: number; heroHand: string | null; villainHand: string | null};
type Spot = {title: string; hero: string[]; villain: string[]; board: string[]; streets: Street[]};

const spots = heroHands.spots as Spot[];
const SUIT: Record<string, string> = {s: '♠', h: '♥', d: '♦', c: '♣'};
const STEP_MS = 2300;
const RIVER_HOLD_MS = 3600;

const label = (rank: string | null) =>
  rank ? rank.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()).replace('Of A', 'of a') : '';

function Card({card, faceDown = false, delayMs = 0}: {card?: string; faceDown?: boolean; delayMs?: number}) {
  if (!card || faceDown) return <span className={clsx(styles.card, styles.back)} aria-hidden />;
  const rank = card[0] === 'T' ? '10' : card[0];
  const suit = card[1];
  return (
    <span
      className={clsx(styles.card, (suit === 'h' || suit === 'd') && styles.red)}
      style={{animationDelay: `${delayMs}ms`}}
      aria-label={card}>
      <span className={styles.rank}>{rank}</span>
      <span className={styles.suit}>{SUIT[suit]}</span>
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Homepage table: deals three spots street by street with exact equities from the package. */
export default function RunItOut(): React.ReactNode {
  const reduced = usePrefersReducedMotion();
  const [spotIndex, setSpotIndex] = useState(0);
  const [streetIndex, setStreetIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const spot = spots[spotIndex];
  const street = spot.streets[streetIndex];
  const last = streetIndex === spot.streets.length - 1;

  useEffect(() => {
    if (reduced) {
      setStreetIndex(spots[spotIndex].streets.length - 1);
      return undefined;
    }
    if (paused) return undefined;
    timer.current = setTimeout(
      () => {
        if (last) {
          setSpotIndex((i) => (i + 1) % spots.length);
          setStreetIndex(0);
        } else {
          setStreetIndex((i) => i + 1);
        }
      },
      last ? RIVER_HOLD_MS : STEP_MS,
    );
    return () => clearTimeout(timer.current);
  }, [spotIndex, streetIndex, paused, reduced, last]);

  const heroPct = street.equity * 100;
  const villainPct = 100 - heroPct;

  return (
    <figure
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      <div className={styles.table}>
        <div className={styles.seat}>
          <div className={styles.hand}>
            {spot.villain.map((c) => (
              <Card key={`${spotIndex}-${c}`} card={c} />
            ))}
          </div>
          <div className={styles.meter}>
            <div className={styles.meterTop}>
              <span className={styles.who}>Villain</span>
              <span className={styles.made}>{label(street.villainHand)}</span>
              <span className={clsx(styles.pct, styles.pctVillain)}>{villainPct.toFixed(1)}%</span>
            </div>
            <div className={styles.bar}>
              <span className={clsx(styles.fill, styles.fillVillain)} style={{width: `${villainPct}%`}} />
            </div>
          </div>
        </div>

        <div className={styles.board}>
          <span className={styles.street}>{street.name}</span>
          <div className={styles.cards}>
            {spot.board.map((c, i) => (
              <Card
                key={`${spotIndex}-${i}-${i < street.cards}`}
                card={i < street.cards ? c : undefined}
                delayMs={street.cards === 3 && i < 3 ? i * 110 : 0}
              />
            ))}
          </div>
        </div>

        <div className={styles.seat}>
          <div className={styles.hand}>
            {spot.hero.map((c) => (
              <Card key={`${spotIndex}-${c}`} card={c} />
            ))}
          </div>
          <div className={styles.meter}>
            <div className={styles.meterTop}>
              <span className={styles.who}>Hero</span>
              <span className={styles.made}>{label(street.heroHand)}</span>
              <span className={clsx(styles.pct, styles.pctHero)}>{heroPct.toFixed(1)}%</span>
            </div>
            <div className={styles.bar}>
              <span className={clsx(styles.fill, styles.fillHero)} style={{width: `${heroPct}%`}} />
            </div>
          </div>
        </div>
      </div>

      <figcaption className={styles.caption}>
        <code className={styles.call}>
          <span className={styles.fnName}>exactHuEquityVsKnownHand</span>(hero, villain, board)
          <span className={styles.arrow}> → </span>
          <span className={styles.result}>{street.equity.toFixed(4)}</span>
        </code>
        <div className={styles.dots} role="tablist" aria-label="Example hands">
          {spots.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === spotIndex}
              className={clsx(styles.dot, i === spotIndex && styles.dotActive)}
              onClick={() => {
                setSpotIndex(i);
                setStreetIndex(reduced ? spots[i].streets.length - 1 : 0);
              }}>
              {s.title}
            </button>
          ))}
        </div>
      </figcaption>
      <p className={styles.srOnly} aria-live="polite">
        {spot.title}, {street.name}: hero {heroPct.toFixed(1)} percent.
      </p>
    </figure>
  );
}
