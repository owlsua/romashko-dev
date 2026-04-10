import { useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import styles from './gui.module.css';

const CHIPS: [string, string][] = [
  ['8%', '12%'],
  ['15%', '75%'],
  ['70%', '10%'],
  ['75%', '80%'],
  ['45%', '85%'],
];

const CookieBannerGui = () => {
  const { visible, accept } = useCookieConsent();
  const [hiding, setHiding] = useState(false);

  if (!visible) return null;

  const handleAccept = () => {
    setHiding(true);
    setTimeout(accept, 600);
  };

  return (
    <div className={`${styles.drop} ${hiding ? styles.dropHide : ''}`}>
      <div className={styles.thread} />

      <div className={styles.cookie}>
        {CHIPS.map((pos, i) => (
          <div
            key={i}
            className={styles.chip}
            style={{ top: pos[0], left: pos[1] }}
          />
        ))}

        <div className={styles.cookieContent}>
          <p className={styles.text}>
            This site uses only strictly necessary cookies
          </p>
          <button
            type="button"
            className={styles.accept}
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBannerGui;
