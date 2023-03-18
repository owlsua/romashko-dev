import { useContext } from 'react';
import { AppContext } from '@/context/app.context';

import styles from './styles.module.css';

const hotKeys = [
  {
    key: 'ctrl + c',
    description: 'clear the current input',
  },
  {
    key: 'ctrl + l',
    description: 'clear the screen',
  },
  {
    key: 'tab',
    description: 'autocomplete',
  },
];
interface CommandListProps {
  commands: string[];
}

interface HotKeyListProps {
  hotKeys: { key: string; description: string }[];
}

const CommandList = ({ commands }: CommandListProps) => {
  return (
    <ul className={styles.commandList}>
      {commands.map((command: string, index: number) => (
        <li key={command} className={styles.command}>
          {command + (index !== commands.length - 1 ? ',' : '')}
        </li>
      ))}
    </ul>
  );
};

const HotKeyList = ({ hotKeys }: HotKeyListProps) => {
  return (
    <ul className={styles.hotKeysList}>
      {hotKeys.map((hotKey) => (
        <li key={hotKey.key} className={styles.hotKey}>
          <span className={styles.key}>{`[${hotKey.key}]`}</span>
          <span className={styles.description}>{hotKey.description}</span>
        </li>
      ))}
    </ul>
  );
};

const Help = () => {
  const { availableCommands } = useContext(AppContext);
  return (
    <div className={styles.helpWrapper}>
      <h3 className={styles.helpTitle}>Available commands:</h3>
      <CommandList commands={availableCommands} />
      <HotKeyList hotKeys={hotKeys} />
    </div>
  );
};

export { CommandList, HotKeyList };
//For testing purposes

export default Help;
