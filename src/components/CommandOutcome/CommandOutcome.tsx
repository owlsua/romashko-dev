import { useContext } from 'react';
import { AppContext } from '@/context/app.context';
import Weather from '@/components/Weather/Weather';

import styles from './styles.module.css';

interface CommandOutcomeProps {
  command: string;
}

const CommandOutcome = ({ command }: CommandOutcomeProps) => {
  const { components } = useContext(AppContext);
  if (command === '') return null;

  const parts = command.trim().split(/\s+/);
  const baseCommand = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');

  if (baseCommand === 'weather' && args) {
    return (
      <div className={styles.commandOutcome} data-testid="commandOutcome">
        <Weather city={args} />
      </div>
    );
  }

  const component = components[baseCommand];
  const notFound = `Command not found: ${command}. Try help to get started.`;

  return (
    <div className={styles.commandOutcome} data-testid="commandOutcome">
      {component || notFound}
    </div>
  );
};

export default CommandOutcome;
