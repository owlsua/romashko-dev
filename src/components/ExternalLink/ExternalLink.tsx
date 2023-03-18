import { openLink } from '@/helpers/helpers';

interface ExternalLinkProps {
  link: string;
  message: string;
}

const ExternalLink = ({ link, message }: ExternalLinkProps) => {
  openLink(link);
  return <p data-testid="externalLink">{message}</p>;
};

export default ExternalLink;
