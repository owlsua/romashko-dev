import type {
  TentacleAlign,
  TentacleCommand,
  TentacleCommandName,
} from 'src/interfaces/octopus-nav.interface';

export const TENTACLE_COMMANDS: TentacleCommand[] = [
  {
    name: 'about',
    label: 'about',
    overlayClass: 'tentacleLeg1',
    left: '15%',
    top: '25%',
    align: 'right',
  },
  {
    name: 'cv',
    label: 'cv',
    overlayClass: 'tentacleLeg2',
    left: '15%',
    top: '53%',
    align: 'right',
  },
  {
    name: 'links',
    label: 'links',
    overlayClass: 'tentacleLeg3',
    left: '24%',
    top: '69%',
    align: 'right',
  },
  // {
  //   name: 'weather',
  //   label: 'weather',
  //   overlayClass: 'tentacleLeg4',
  //   left: '42%',
  //   top: '74%',
  //   align: 'center',
  // },
  {
    name: 'terminal',
    label: '> terminal',
    overlayClass: 'tentacleLeg6',
    left: '76%',
    top: '69%',
    align: 'left',
    href: '/terminal',
  },
  {
    name: 'weather',
    label: 'weather',
    overlayClass: 'tentacleLeg7',
    left: '85%',
    top: '53%',
    align: 'left',
  },
  {
    name: 'skills',
    label: 'skills',
    overlayClass: 'tentacleLeg8',
    left: '85%',
    top: '25%',
    align: 'left',
  },
];

export const ALIGN_TRANSFORM: Record<TentacleAlign, string> = {
  left: 'translate(4px, -50%)',
  right: 'translate(-100%, -50%) translateX(-4px)',
  center: 'translate(-50%, 4px)',
};

export const EXTERNAL_COMMANDS = new Set(['github', 'linkedin', 'cv']);

export type LimbPath = { d: string; fill: string };

export type LimbConfig = {
  className: string;
  command?: TentacleCommandName;
  paths: LimbPath[];
};

export const LIMB_CONFIGS: LimbConfig[] = [
  {
    className: 'svgLeg1',
    command: 'about',
    paths: [
      { d: 'M7 11h3v4H7z', fill: '#4a86e8' },
      { d: 'M5 11h3v3H5z', fill: '#4a86e8' },
      { d: 'M3 10h3v2H3z', fill: '#4a86e8' },
      { d: 'M1 9h2v2H1z', fill: '#4a86e8' },
      { d: 'M0 8h1v2H0z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg2',
    command: 'cv',
    paths: [
      { d: 'M7 15h3v3H7z', fill: '#4a86e8' },
      { d: 'M5 16h3v2H5z', fill: '#4a86e8' },
      { d: 'M3 17h3v2H3z', fill: '#4a86e8' },
      { d: 'M1 18h2v1H1z', fill: '#4a86e8' },
      { d: 'M0 18h1v2H0z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg3',
    command: 'links',
    paths: [
      { d: 'M8 18h4v2H8z', fill: '#4a86e8' },
      { d: 'M7 20h3v2H7z', fill: '#4a86e8' },
      { d: 'M5 22h2v2H5z', fill: '#4a86e8' },
      { d: 'M4 24h1v2H4z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg4',
    // command: 'weather',
    paths: [
      { d: 'M12 18h3v3h-3z', fill: '#4a86e8' },
      { d: 'M12 21h2v3h-2z', fill: '#4a86e8' },
      { d: 'M12 24h1v2h-1z', fill: '#4a86e8' },
      { d: 'M12 26h1v1h-1z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg5',
    paths: [
      { d: 'M17 18h3v3h-3z', fill: '#4a86e8' },
      { d: 'M18 21h2v3h-2z', fill: '#4a86e8' },
      { d: 'M19 24h1v2h-1z', fill: '#4a86e8' },
      { d: 'M19 26h1v1h-1z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg6',
    command: 'terminal',
    paths: [
      { d: 'M20 18h4v2h-4z', fill: '#4a86e8' },
      { d: 'M22 20h3v2h-3z', fill: '#4a86e8' },
      { d: 'M25 22h2v2h-2z', fill: '#4a86e8' },
      { d: 'M27 24h1v2h-1z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg7',
    command: 'weather',
    paths: [
      { d: 'M22 15h3v3h-3z', fill: '#4a86e8' },
      { d: 'M24 16h3v2h-3z', fill: '#4a86e8' },
      { d: 'M26 17h3v2h-3z', fill: '#4a86e8' },
      { d: 'M29 18h2v1h-2z', fill: '#4a86e8' },
      { d: 'M31 18h1v2h-1z', fill: '#e0e0e0' },
    ],
  },
  {
    className: 'svgLeg8',
    command: 'skills',
    paths: [
      { d: 'M22 11h3v4h-3z', fill: '#4a86e8' },
      { d: 'M24 11h3v3h-3z', fill: '#4a86e8' },
      { d: 'M26 10h3v2h-3z', fill: '#4a86e8' },
      { d: 'M29 9h2v2h-2z', fill: '#4a86e8' },
      { d: 'M31 8h1v2h-1z', fill: '#e0e0e0' },
    ],
  },
];
