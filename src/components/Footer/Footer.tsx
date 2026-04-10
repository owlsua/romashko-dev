import Image from 'next/image';
import Runners from '@/components/Runners/Runners';
import styles from './styles.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Image
      className={styles.mountains}
      src="/images/mountains.svg"
      alt=""
      width={1200}
      height={400}
    />
    <Runners />
  </footer>
);

export default Footer;
