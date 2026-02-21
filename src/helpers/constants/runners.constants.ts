export type RunnerType = 'primitive' | 'modern' | 'knight';

export type RunnerExtra = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
};

export type RunnerSkin = {
  hair: string;
  skin: string;
  top: string;
  bottom: string;
  shoes: string;
  extra?: RunnerExtra[];
};

export const RUNNER_TYPES: RunnerType[] = ['primitive', 'modern', 'knight'];

export const RUNNER_SKINS_MAP: Record<RunnerType, RunnerSkin[]> = {
  primitive: [
    {
      hair: '#6e4a2a',
      skin: '#c49870',
      top: '#8a7048',
      bottom: '#8a7048',
      shoes: '#6e5030',
      extra: [
        { x: 0, y: 0, w: 1, h: 1, fill: '#6e4a2a' },
        { x: 5, y: 0, w: 1, h: 1, fill: '#6e4a2a' },
        { x: -1, y: -2, w: 1, h: 3, fill: '#8a8880' },
        { x: -1, y: 1, w: 1, h: 12, fill: '#6e5030' },
      ],
    },
    {
      hair: '#3a3a2a',
      skin: '#b08860',
      top: '#7a6840',
      bottom: '#7a6840',
      shoes: '#5a4828',
      extra: [
        { x: 6, y: -2, w: 1, h: 3, fill: '#8a8880' },
        { x: 6, y: 1, w: 1, h: 12, fill: '#5a4828' },
      ],
    },
  ],
  modern: [
    {
      hair: '#6e5040',
      skin: '#ddc8a8',
      top: '#7a9ec4',
      bottom: '#505068',
      shoes: '#2a2a2a',
    },
    {
      hair: '#9e8858',
      skin: '#ddc8a8',
      top: '#c4827a',
      bottom: '#506850',
      shoes: '#2a2a2a',
    },
    {
      hair: '#505a60',
      skin: '#c09878',
      top: '#7ac48a',
      bottom: '#585878',
      shoes: '#2a2a2a',
    },
  ],
  knight: [
    {
      hair: '#8a8a98',
      skin: '#ddc8a8',
      top: '#8a8a98',
      bottom: '#707080',
      shoes: '#606070',
      extra: [
        { x: 0, y: -1, w: 6, h: 1, fill: '#8a8a98' },
        { x: 0, y: 1, w: 1, h: 2, fill: '#8a8a98' },
        { x: 5, y: 1, w: 1, h: 2, fill: '#8a8a98' },
        { x: 6, y: -1, w: 1, h: 7, fill: '#b0b0b8' },
        { x: 5, y: 5, w: 3, h: 1, fill: '#6a5a30' },
      ],
    },
    {
      hair: '#70706a',
      skin: '#d8c4a8',
      top: '#70706a',
      bottom: '#606058',
      shoes: '#505048',
      extra: [
        { x: 0, y: -1, w: 6, h: 1, fill: '#70706a' },
        { x: 0, y: 1, w: 1, h: 2, fill: '#70706a' },
        { x: 5, y: 1, w: 1, h: 2, fill: '#70706a' },
        { x: -1, y: -1, w: 1, h: 7, fill: '#a0a0a8' },
        { x: -2, y: 5, w: 3, h: 1, fill: '#6a5a30' },
      ],
    },
  ],
};

export const RUNNER_BASE_YS = [40, 38, 44, 36, 42, 39];
