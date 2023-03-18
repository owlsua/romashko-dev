import styles from './styles.module.css';

interface TitleProps {
  title: string | string[];
}

const Title = ({ title }: TitleProps) => {
  return (
    <>
      {Array.isArray(title) ? (
        <h1 className={styles.gradientText} data-testid="title">
          {title[0]}
          <small data-testid="subtitle">{title[1]}</small>
        </h1>
      ) : (
        <h1 className={styles.gradientText} data-testid="title">
          {title}
        </h1>
      )}
    </>
  );
};

export default Title;
