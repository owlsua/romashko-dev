import Starfield from '@/components/Starfield/Starfield';
import { ImageIcon } from '@/components/Icons';
import styles from './styles.module.css';
import Card from './Card/Card';

const Landing = () => (
  <div className={styles.landing}>
    <Starfield />
    <h1 className={styles.title}>Romashko.dev</h1>
    <p className={styles.subtitle}>select interface</p>
    <div className={styles.choices}>
      <Card
        href="/terminal"
        title="terminal"
        symbol={
          <>
            {'>'} _<span className={styles.cursor}>|</span>
          </>
        }
        label="command line"
      />
      <Card
        href="/gui"
        title="gui"
        symbol={<ImageIcon width={42} height={42} />}
        label="graphical"
      />
    </div>
  </div>
);

export default Landing;
