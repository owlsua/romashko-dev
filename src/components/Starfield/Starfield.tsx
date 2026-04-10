import styles from './styles.module.css';

type StarSize = 'small' | 'medium' | 'large';

type Star = {
  id: number;
  x: number;
  y: number;
  size: StarSize;
  duration: number;
  delay: number;
  opacity: number;
};

const STAR_COUNT = 170;

const randomFactory = (seed: number) => {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
};

const createStars = (count: number): Star[] => {
  const random = randomFactory(42);

  return Array.from({ length: count }, (_, id) => {
    const sizeRoll = random();
    const size: StarSize =
      sizeRoll < 0.7 ? 'small' : sizeRoll < 0.92 ? 'medium' : 'large';

    return {
      id,
      x: random() * 100,
      y: random() * 100,
      size,
      duration: 2.2 + random() * 4.5,
      delay: random() * 5,
      opacity: 0.35 + random() * 0.6,
    };
  });
};

const STARS = createStars(STAR_COUNT);

const Starfield = () => (
  <div className={styles.starsContainer}>
    <div className={styles.starsLayer}>
      {STARS.map((star) => {
        const sizeClass =
          star.size === 'small'
            ? styles.starSmall
            : star.size === 'medium'
              ? styles.starMedium
              : styles.starLarge;

        return (
          <span
            key={star.id}
            className={`${styles.star} ${sizeClass}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        );
      })}
    </div>
    <div className={styles.shootingStar} />
    <div className={styles.shootingStar2} />
    <div className={styles.shootingStar3} />
    <div className={styles.moon} />
  </div>
);

export default Starfield;
