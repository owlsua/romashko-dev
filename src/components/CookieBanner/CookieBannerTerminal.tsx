import { useState, useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import promptStyles from '@/components/Prompt/styles.module.css';
import styles from './terminal.module.css';

const FULL_TEXT = 'This site uses only strictly necessary cookies.';

const CookieBannerTerminal = () => {
  const { visible, accept } = useCookieConsent();
  const [typed, setTyped] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (!visible) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
        setShowButtons(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={promptStyles.wrapper}>
        <label className={promptStyles.label}>
          <div className={promptStyles.userName}>guest</div>
          <div className={promptStyles.atSign}>@</div>
          <div className={promptStyles.productName}>romashko.dev</div>
          <div className={promptStyles.last}>:$ ~</div>
        </label>
        <span className={styles.command}>cookies --accept-all</span>
      </div>

      <div className={styles.response}>
        <div className={styles.output}>
          {typed}
          {!showButtons && <span className={styles.cursor}>|</span>}
        </div>

        {showButtons && (
          <div className={styles.line}>
            <span className={styles.separator}>accept?</span>
            <button type="button" className={styles.key} onClick={accept}>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBannerTerminal;
