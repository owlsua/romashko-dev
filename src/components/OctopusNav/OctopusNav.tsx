import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { getSiteConfig } from '@/config/siteConfig';
import WeatherPopup from '@/components/WeatherPopup/WeatherPopup';
import {
  ALIGN_TRANSFORM,
  EXTERNAL_COMMANDS,
  LIMB_CONFIGS,
  TENTACLE_COMMANDS,
  TentacleCommand,
  TentacleCommandName,
} from '@/helpers/constants/octopusNav.constants';
import Popup from '../Popup/Popup';
import popupStyles from '../Popup/styles.module.css';

import styles from './styles.module.css';

const OctopusNav = () => {
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
      title: 'skills.exe',
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
      title: 'weather.exe',
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
    if (name === 'terminal') return; // handled by Link
    setActivePopup(name);
  };

  const handleLimbMouseEnter = (command?: TentacleCommandName) => {
    if (!command) return;
    setHoveredCmd(command);
  };

  const handleLimbMouseLeave = (command?: TentacleCommandName) => {
    if (!command) return;
    setHoveredCmd(null);
  };

  const handleLimbClick = (command?: TentacleCommandName) => {
    if (!command) return;
    handleClick(command);
  };

  const handleLabelMouseEnter = (name: TentacleCommandName) => {
    setHoveredCmd(name);
  };

  const handleLabelMouseLeave = () => {
    setHoveredCmd(null);
  };

  const handleLabelClick = (name: TentacleCommandName) => {
    handleClick(name);
  };

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
          <style>{`
            @keyframes wiggle-l { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-3deg)} }
            @keyframes wiggle-r { 0%,100%{transform:rotate(0)} 50%{transform:rotate(3deg)} }
            @keyframes wiggle-bl { 0%,100%{transform:rotate(0)} 40%{transform:rotate(-2.5deg)} 80%{transform:rotate(1.5deg)} }
            @keyframes wiggle-br { 0%,100%{transform:rotate(0)} 40%{transform:rotate(2.5deg)} 80%{transform:rotate(-1.5deg)} }
            @keyframes bob-l { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-2deg)} }
            @keyframes bob-r { 0%,100%{transform:rotate(0)} 50%{transform:rotate(2deg)} }
            .leg-1 { transform-origin:9px 14px; animation:wiggle-l 3s ease-in-out infinite }
            .leg-2 { transform-origin:9px 17px; animation:wiggle-bl 3.8s ease-in-out .1s infinite }
            .leg-3 { transform-origin:10px 19px; animation:wiggle-bl 3.5s ease-in-out infinite }
            .leg-4 { transform-origin:13px 19px; animation:bob-l 2.8s ease-in-out .2s infinite }
            .leg-5 { transform-origin:19px 19px; animation:bob-r 2.8s ease-in-out .4s infinite }
            .leg-6 { transform-origin:22px 19px; animation:wiggle-br 3.5s ease-in-out .3s infinite }
            .leg-7 { transform-origin:23px 17px; animation:wiggle-br 3.8s ease-in-out .5s infinite }
            .leg-8 { transform-origin:23px 14px; animation:wiggle-r 3s ease-in-out infinite }
            .leg-1,.leg-2,.leg-3,.leg-4,.leg-5,.leg-6,.leg-7,.leg-8 { cursor:pointer }
            .hovered path { fill:#7ab3ff }
          `}</style>

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
              className={`${limb.className}${limb.command && hoveredCmd === limb.command ? ' hovered' : ''}`}
              onMouseEnter={() => handleLimbMouseEnter(limb.command)}
              onMouseLeave={() => handleLimbMouseLeave(limb.command)}
              onClick={() => handleLimbClick(limb.command)}
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
            {cmd.name === 'terminal' ? (
              <Link
                href="/"
                className={getLabelClassName(cmd.name)}
                style={getLabelStyle(cmd)}
                onMouseEnter={() => handleLabelMouseEnter(cmd.name)}
                onMouseLeave={handleLabelMouseLeave}
              >
                {cmd.label}
              </Link>
            ) : (
              <button
                type="button"
                className={getLabelClassName(cmd.name)}
                style={getLabelStyle(cmd)}
                onMouseEnter={() => handleLabelMouseEnter(cmd.name)}
                onMouseLeave={handleLabelMouseLeave}
                onClick={() => handleLabelClick(cmd.name)}
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
