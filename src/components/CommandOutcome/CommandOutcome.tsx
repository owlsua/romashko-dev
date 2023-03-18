import { useContext } from 'react';
import { AppContext } from '@/context/app.context';

import styles from './styles.module.css';

interface CommandOutcomeProps {
  command: { value: string };
}

const CommandOutcome = ({ command }: CommandOutcomeProps) => {
  const { components } = useContext(AppContext);
  if (command.value === '') return null;

  const component = components[command.value];
  const notFound = `Command not found: ${command.value}. Try help to get started.`;

  return <div className={styles.commandOutcome}>{component || notFound}</div>;
};

export default CommandOutcome;
