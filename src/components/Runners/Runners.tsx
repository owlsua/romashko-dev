import { useEffect, useRef, useState } from 'react';
import {
  RUNNER_BASE_YS,
  RUNNER_SKINS_MAP,
  RUNNER_TYPES,
} from '@/helpers/constants/runners.constants';
import type { RunnersProps } from 'src/interfaces/runners.interface';
import styles from './styles.module.css';

const Runners = ({ count = 3 }: RunnersProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(400);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const updateViewBox = () => {
      const { clientWidth, clientHeight } = svg;
      if (!clientWidth || !clientHeight) return;

      const nextWidth = Math.max(
        240,
        Math.round((clientWidth / clientHeight) * 60),
      );
      setViewBoxWidth(nextWidth);
    };

    updateViewBox();

    const resizeObserver = new ResizeObserver(updateViewBox);
    resizeObserver.observe(svg);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const runners = Array.from({ length: count }, (_, i) => {
    const type = RUNNER_TYPES[i % RUNNER_TYPES.length];
    const variants = RUNNER_SKINS_MAP[type];
    const variant = variants[i % variants.length];
    const baseY = RUNNER_BASE_YS[i % RUNNER_BASE_YS.length];
    const limbSpeed = 0.35 + (i % 3) * 0.05;
    return {
      id: i,
      type,
      baseY,
      variant,
      direction: i % 2 === 0 ? 'right' : 'left',
      speed: 15 + ((i * 3) % 10),
      delay: (i * 4) % 12,
      limbSpeed,
      armY: baseY + 5,
      legY: baseY + 8,
    };
  });

  const perRunner = runners
    .map(
      (r) =>
        `.fr-${r.id}{animation:run-${r.direction} ${r.speed}s linear ${r.delay}s infinite}` +
        `.fll-${r.id}{transform-origin:2px ${r.legY}px;animation:legs-run ${r.limbSpeed}s linear infinite}` +
        `.flr-${r.id}{transform-origin:4px ${r.legY}px;animation:legs-run ${r.limbSpeed}s linear ${(r.limbSpeed / 2).toFixed(3)}s infinite}` +
        `.fal-${r.id}{transform-origin:1px ${r.armY}px;animation:arm-swing ${r.limbSpeed}s linear infinite}` +
        `.far-${r.id}{transform-origin:5px ${r.armY}px;animation:arm-swing-r ${r.limbSpeed}s linear infinite}`,
    )
    .join('');

  return (
    <svg
      ref={svgRef}
      className={styles.runners}
      viewBox={`0 0 ${viewBoxWidth} 60`}
      preserveAspectRatio="xMinYMax meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes run-right{from{transform:translateX(-20px)}to{transform:translateX(${viewBoxWidth + 20}px)}}
        @keyframes run-left{from{transform:translateX(${viewBoxWidth + 20}px)}to{transform:translateX(-20px)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-1px)}}
        @keyframes legs-run{0%{transform:skewX(-8deg)}50%{transform:skewX(8deg)}100%{transform:skewX(-8deg)}}
        @keyframes arm-swing{0%{transform:rotate(15deg)}50%{transform:rotate(-15deg)}100%{transform:rotate(15deg)}}
        @keyframes arm-swing-r{0%{transform:rotate(-15deg)}50%{transform:rotate(15deg)}100%{transform:rotate(-15deg)}}
        .fhop{animation:bounce .3s steps(2) infinite}
        ${perRunner}
      `}</style>

      {runners.map((r) => {
        const v = r.variant;
        return (
          <g key={r.id} className={`fr-${r.id}`}>
            <g className="fhop">
              {/* Extra elements (helmet, weapons, wild hair, etc.) */}
              {v.extra?.map((e, ei) => (
                <rect
                  key={ei}
                  x={e.x}
                  y={r.baseY + e.y}
                  width={e.w}
                  height={e.h}
                  fill={e.fill}
                />
              ))}
              {/* Hair */}
              <rect x="1" y={r.baseY} width="4" height="1" fill={v.hair} />
              {/* Head */}
              <rect x="1" y={r.baseY + 1} width="4" height="3" fill={v.skin} />
              {/* Eyes */}
              <rect x="2" y={r.baseY + 2} width="1" height="1" fill="#1a1a1a" />
              <rect x="4" y={r.baseY + 2} width="1" height="1" fill="#1a1a1a" />
              {/* Body */}
              <rect x="1" y={r.baseY + 4} width="4" height="4" fill={v.top} />
              {/* Arms */}
              <rect
                className={`fal-${r.id}`}
                x="0"
                y={r.baseY + 4}
                width="1"
                height="3"
                fill={r.type === 'knight' ? v.top : v.skin}
              />
              <rect
                className={`far-${r.id}`}
                x="5"
                y={r.baseY + 4}
                width="1"
                height="3"
                fill={r.type === 'knight' ? v.top : v.skin}
              />
              {/* Legs */}
              <rect
                className={`fll-${r.id}`}
                x="1"
                y={r.baseY + 8}
                width="2"
                height="3"
                fill={v.bottom}
              />
              <rect
                className={`flr-${r.id}`}
                x="3"
                y={r.baseY + 8}
                width="2"
                height="3"
                fill={v.bottom}
              />
              {/* Shoes */}
              <rect
                className={`fll-${r.id}`}
                x="1"
                y={r.baseY + 11}
                width="2"
                height="1"
                fill={v.shoes}
              />
              <rect
                className={`flr-${r.id}`}
                x="3"
                y={r.baseY + 11}
                width="2"
                height="1"
                fill={v.shoes}
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default Runners;
