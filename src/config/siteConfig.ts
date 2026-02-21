import type {
  SiteConfig,
  SiteLink,
} from 'src/interfaces/site-config.interface';

export const getSiteConfig = (): SiteConfig => {
  const aboutContent = process.env.NEXT_PUBLIC_ABOUT || '';
  const skillsRow = process.env.NEXT_PUBLIC_SKILLS || '';
  const skills = skillsRow.split(', ').filter(Boolean);

  const links: SiteLink[] = [
    {
      key: 'github',
      label: 'GitHub',
      url: process.env.NEXT_PUBLIC_GITHUB_LINK || '',
      message: 'opening Github...',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      url: process.env.NEXT_PUBLIC_LINKEDIN_LINK || '',
      message: 'opening LinkedIn...',
    },
    {
      key: 'telegram',
      label: 'Telegram',
      url: process.env.NEXT_PUBLIC_TELEGRAM_LINK || '',
      message: 'opening Telegram...',
    },
    {
      key: 'email',
      label: 'Email',
      url: process.env.NEXT_PUBLIC_EMAIL_LINK || '',
      message: 'opening email...',
    },
    {
      key: 'repo',
      label: 'Source Code',
      url: process.env.NEXT_PUBLIC_REPO_LINK || '',
      message: 'opening repo...',
    },
    {
      key: 'cv',
      label: 'CV',
      url: process.env.NEXT_PUBLIC_CV_LINK || '',
      message: 'opening cv...',
    },
  ];

  return { aboutContent, skills, links };
};
