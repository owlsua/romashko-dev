import styles from './styles.module.css';
import cx from 'classnames';

interface AboutProps {
  content: string;
}

const About = ({ content }: AboutProps) => {
  return (
    <div className={styles.aboutWrapper} data-testid="about">
      <p
        className={cx(styles.paragraph, styles.greet)}
        data-testid="aboutHello"
      >
        Hello and welcome!
      </p>
      <p className={styles.paragraph} data-testid="aboutContent">
        {content}
      </p>
      <p className={cx(styles.paragraph, styles.help)} data-testid="aboutHelp">
        Type &apos;help&apos; to see list of available commands.
      </p>
    </div>
  );
};

export default About;
