import styles from './styles.module.css';

interface TitleProps {
  title: string | string[];
}

const Title = ({ title }: TitleProps) => (
  <h1 className={`${styles.gradientText} gradientTitle`} data-testid="title">
    {Array.isArray(title) ? (
      <>
        {title[0]}
        <small data-testid="subtitle">{title[1]}</small>
      </>
    ) : (
      title
    )}
  </h1>
);

export default Title;
