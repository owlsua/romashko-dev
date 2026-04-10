import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSiteConfig } from '@/config/siteConfig';
import WeatherPopup from '@/components/WeatherPopup/WeatherPopup';
import type {
  TentacleCommand,
  TentacleCommandName,
} from '@/interfaces/octopus-nav.interface';
import {
  ALIGN_TRANSFORM,
  EXTERNAL_COMMANDS,
  LIMB_CONFIGS,
  TENTACLE_COMMANDS,
} from '@/helpers/constants/octopusNav.constants';

const HREF_COMMANDS = new Map(
  TENTACLE_COMMANDS.filter((c) => c.href).map((c) => [c.name, c.href!]),
);
import Popup from '../Popup/Popup';
import popupStyles from '../Popup/styles.module.css';

import styles from './styles.module.css';

const OctopusNav = () => {
  const router = useRouter();
  const [activePopup, setActivePopup] = useState<TentacleCommandName | null>(
    null,
  );
  const [hoveredCmd, setHoveredCmd] = useState<TentacleCommandName | null>(
    null,
  );
  const { aboutContent, skills, links } = getSiteConfig();

  const popupContent: Partial<
    Record<TentacleCommandName, { title: string; body: ReactNode }>
  > = {
    about: {
      title: 'about.txt',
      body: <p className={popupStyles.popupText}>{aboutContent}</p>,
    },
    skills: {
      title: 'skills',
      body: (
        <ul className={popupStyles.skillList}>
          {skills.map((skill, i) => (
            <li key={i} className={popupStyles.skill}>
              {skill}
            </li>
          ))}
        </ul>
      ),
    },
    help: {
      title: 'help.txt',
      body: (
        <div className={popupStyles.popupText}>
          <p>Available commands:</p>
          <ul className={popupStyles.helpList}>
            {TENTACLE_COMMANDS.map((c) => (
              <li key={c.name}>{c.label}</li>
            ))}
          </ul>
        </div>
      ),
    },
    links: {
      title: 'links.url',
      body: (
        <div className={popupStyles.linksGrid}>
          {links
            .filter((l) => l.url)
            .map((l) => (
              <a
                key={l.key}
                href={l.key === 'email' ? `mailto:${l.url}` : l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={popupStyles.linkItem}
              >
                {l.label}
              </a>
            ))}
        </div>
      ),
    },
    weather: {
      title: 'weather',
      body: <WeatherPopup />,
    },
  };

  const externalUrls = links.reduce<Record<string, string>>((acc, linkItem) => {
    if (linkItem.url) acc[linkItem.key] = linkItem.url;
    return acc;
  }, {});

  const handleClick = (name: TentacleCommandName) => {
    if (EXTERNAL_COMMANDS.has(name)) {
      const url = externalUrls[name];
      if (url) window.open(url, '_blank');
      return;
    }
    const href = HREF_COMMANDS.get(name);
    if (href) {
      router.push(href);
      return;
    }
    setActivePopup(name);
  };

  const handleHover = (name: TentacleCommandName | null) => setHoveredCmd(name);

  const getLabelClassName = (name: TentacleCommandName) =>
    `${styles.label}${hoveredCmd === name ? ` ${styles.labelHovered}` : ''}`;

  const getLabelStyle = (cmd: TentacleCommand) => ({
    left: cmd.left,
    top: cmd.top,
    transform: ALIGN_TRANSFORM[cmd.align],
    pointerEvents: 'auto' as const,
  });

  return (
    <>
      <div className={styles.wrapper}>
        <svg
          className={styles.svg}
          viewBox="-6 0 44 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body */}
          <path
            d="M11 5h10v1h-10zM10 6h12v1h-12zM9 7h14v10H9zM10 17h12v1h-12z"
            fill="#2a4d85"
          />
          <path
            d="M12 6h8v1h-8zM11 7h10v1h-10zM10 8h12v8h-12z"
            fill="#4a86e8"
          />
          <path d="M13 7h4v1h-4zM12 8h2v1h-2z" fill="#90caf9" />

          {/* Eyes */}
          <rect x="12" y="11" width="4" height="3" fill="#fff" />
          <rect x="18" y="11" width="4" height="3" fill="#fff" />
          <rect x="13" y="12" width="2" height="2" fill="#1a1a1a" />
          <rect x="19" y="12" width="2" height="2" fill="#1a1a1a" />

          {/* Mouth */}
          <rect
            x="15"
            y="15"
            width="3"
            height="1"
            fill="#1a237e"
            opacity="0.4"
          />

          {/* Belt */}
          <path d="M13 16h8v1h-8z" fill="#32599e" />

          {LIMB_CONFIGS.map((limb, idx) => (
            <g
              key={limb.command ?? `limb-${idx}`}
              className={`${styles[limb.className]}${limb.command && hoveredCmd === limb.command ? ` ${styles.hoveredLeg}` : ''}`}
              onMouseEnter={() => limb.command && handleHover(limb.command)}
              onMouseLeave={() => handleHover(null)}
              onClick={() => limb.command && handleClick(limb.command)}
              style={{ cursor: limb.command ? 'pointer' : 'default' }}
            >
              {limb.paths.map((path) => (
                <path
                  key={`${limb.command ?? idx}-${path.d}`}
                  d={path.d}
                  fill={path.fill}
                />
              ))}
            </g>
          ))}
        </svg>

        {TENTACLE_COMMANDS.map((cmd) => (
          <div
            key={cmd.name}
            className={`${styles.tentacleOverlay} ${styles[cmd.overlayClass]}`}
          >
            {cmd.href ? (
              <Link
                href={cmd.href}
                className={getLabelClassName(cmd.name)}
                style={getLabelStyle(cmd)}
                onMouseEnter={() => handleHover(cmd.name)}
                onMouseLeave={() => handleHover(null)}
              >
                {cmd.label}
              </Link>
            ) : (
              <button
                type="button"
                className={getLabelClassName(cmd.name)}
                style={getLabelStyle(cmd)}
                onMouseEnter={() => handleHover(cmd.name)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick(cmd.name)}
              >
                {cmd.label}
              </button>
            )}
          </div>
        ))}
      </div>

      <Popup
        activePopup={activePopup}
        popupContent={popupContent}
        onClose={() => setActivePopup(null)}
      />
    </>
  );
};

export default OctopusNav;
