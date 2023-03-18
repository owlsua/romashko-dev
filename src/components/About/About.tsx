import styles from './styles.module.css';
import cx from 'classnames';

interface AboutProps {
  content: string;
}

const About = ({ content }: AboutProps) => {
  return (
    <div className={styles.aboutWrapper}>
      <p className={cx(styles.paragraph, styles.greet)}>Hello and welcome!</p>
      <p className={styles.paragraph}>{content}</p>
      <p className={cx(styles.paragraph, styles.help)}>
        Type &apos;help&apos; to see list of available commands.
      </p>
    </div>
  );
};

export default About;
