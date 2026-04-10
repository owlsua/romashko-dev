import { ReactNode } from 'react';
import type { TentacleCommandName } from '@/interfaces/octopus-nav.interface';
import styles from './styles.module.css';

type PopupContent = Partial<
  Record<TentacleCommandName, { title: string; body: ReactNode }>
>;

type PopupProps = {
  activePopup: TentacleCommandName | null;
  popupContent: PopupContent;
  onClose: () => void;
};

const Popup = ({ activePopup, popupContent, onClose }: PopupProps) => {
  if (!activePopup || !popupContent[activePopup]) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <section
        className={styles.popup}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className={styles.popupTitleBar}>
          <div className={styles.popupIcon} />
          <span className={styles.popupTitle}>
            {popupContent[activePopup].title}
          </span>
          <div className={styles.popupControls}>
            <div className={styles.popupBtn}>&#x2500;</div>
            <div className={styles.popupBtn}>&#x25A1;</div>
            <button
              type="button"
              className={styles.popupBtnClose}
              onClick={onClose}
            >
              &#x2715;
            </button>
          </div>
        </div>
        <div className={styles.popupBody}>{popupContent[activePopup].body}</div>
      </section>
    </div>
  );
};

export default Popup;
