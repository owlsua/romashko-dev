import styles from './styles.module.css';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      Romashko<span className={styles.dot}>.dev</span>
    </h1>
    <span className={styles.subtitle}>Web Developer</span>
  </header>
);

export default Header;
