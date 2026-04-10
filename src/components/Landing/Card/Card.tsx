import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

type CardProps = {
  href: string;
  title: string;
  symbol: ReactNode;
  label: string;
};

const Card = ({ href, title, symbol, label }: CardProps) => (
  <Link href={href} className={styles.card}>
    <div className={styles.cardBar}>
      <div className={styles.cardIcon} />
      {title}
    </div>
    <div className={styles.cardBody}>
      <span className={styles.cardSymbol}>{symbol}</span>
      <span className={styles.cardLabel}>{label}</span>
    </div>
  </Link>
);

export default Card;
