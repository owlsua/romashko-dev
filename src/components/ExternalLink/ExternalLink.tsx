import { openLink } from '@/helpers/helpers';
import styles from './styles.module.css';

interface ExternalLinkProps {
  link: string;
  message: string;
}

const ExternalLink = ({ link, message }: ExternalLinkProps) => {
  openLink(link);
  return (
    <p className={styles.message} data-testid="externalLink">
      {message}
    </p>
  );
};

export default ExternalLink;
