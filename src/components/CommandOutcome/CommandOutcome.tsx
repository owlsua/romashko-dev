import { useContext } from 'react';
import { AppContext } from '@/context/app.context';

import styles from './styles.module.css';

interface CommandOutcomeProps {
  command: string;
}

const CommandOutcome = ({ command }: CommandOutcomeProps) => {
  const { components } = useContext(AppContext);
  if (command === '') return null;

  const component = components[command];
  const notFound = `Command not found: ${command}. Try help to get started.`;

  return (
    <div className={styles.commandOutcome} data-testid="commandOutcome">
      {component || notFound}
    </div>
  );
};

export default CommandOutcome;
