import type { NextApiRequest, NextApiResponse } from 'next';
import { getSiteConfig } from '@/config/siteConfig';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method not allowed');
  }

  const { aboutContent, skills, links } = getSiteConfig();

  const contactLines = links
    .filter((l) => l.url)
    .map((l) => {
      return `- ${l.label}: ${l.url}`;
    })
    .join('\n');

  const skillLines = skills.map((s) => `- ${s}`).join('\n');

  const body = `# Romashko.dev

> Personal portfolio website of a web developer known as Romashko.

## About

${aboutContent}

## Skills

${skillLines}

## Site Structure

- \`/\` — Landing page with interface selection (terminal or GUI)
- \`/terminal\` — Interactive terminal emulator with typed commands
- \`/gui\` — Graphical interface with animated pixel-art octopus navigation, starfield background, and retro-styled popup windows

## Available Terminal Commands

- \`about\` — Information about the developer
- \`skills\` — List of technical skills
- \`github\` — Link to GitHub profile
- \`linkedin\` — Link to LinkedIn profile
- \`telegram\` — Link to Telegram
- \`email\` — Contact email
- \`cv\` — Link to CV/resume
- \`repo\` — Link to source code repository
- \`weather\` — Current weather widget
- \`gui\` — Switch to graphical interface
- \`help\` — List all available commands

## Contact

${contactLines}
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.status(200).send(body);
}
