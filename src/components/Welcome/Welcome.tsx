import Title from '@/components/Title/Title';
import About from '@/components/About/About';

import styles from './styles.module.css';

const aboutContent =
  "I'm Alexander Romashko and this is my personal website where you can explore my projects and learn more about me by interacting with the app using a command-line interface.";
const title = ['Romashko', '.dev'];

const Welcome = () => {
  return (
    <div className={styles.welcome} data-testid="welcome">
      <Title title={title} />
      <About content={aboutContent} />
    </div>
  );
};

export default Welcome;
