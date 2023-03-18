import { useContext } from 'react';
import CommandOutcome from '@/components/CommandOutcome/CommandOutcome';
import Prompt from '../Prompt/Prompt';
import { AppContext } from '@/context/app.context';
import { observer } from 'mobx-react-lite';

import styles from './styles.module.css';

const MainFlow = observer(() => {
  const { commands } = useContext(AppContext);
  return (
    <div className={styles.mainFlow} data-testid="mainFlow">
      <Prompt />
      {commands.commands.map((command: { value: string }, index: number) => (
        <div key={command.value + index}>
          <CommandOutcome command={command.value} />
          <Prompt index={index} />
        </div>
      ))}
    </div>
  );
});

export default MainFlow;
