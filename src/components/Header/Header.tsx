import Link from 'next/link';
import styles from './styles.module.css';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      <Link href="/" className={styles.titleLink}>
        Romashko<span className={styles.dot}>.dev</span>
      </Link>
    </h1>
    <span className={styles.subtitle}>Web Developer</span>
  </header>
);

export default Header;
