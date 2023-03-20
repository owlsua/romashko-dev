import Input from '../Input/Input';

import styles from './styles.module.css';

interface PromptProps {
  index?: number;
}

const Prompt = ({ index }: PromptProps) => {
  return (
    <div className={styles.wrapper} data-testid="prompt">
      <label
        className={styles.label}
        htmlFor="commandInput"
        data-testid="label"
      >
        <div className={styles.userName} data-testid="userName">
          guest
        </div>
        <div className={styles.atSign} data-testid="atSign">
          @
        </div>
        <div className={styles.productName} data-testid="productName">
          romashko.dev
        </div>
        <div className={styles.last} data-testid="last">
          :$ ~
        </div>
      </label>
      <Input index={index} />
    </div>
  );
};

export default Prompt;
