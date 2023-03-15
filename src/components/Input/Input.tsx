import React, { useContext, useState } from 'react';
import styles from './styles.module.css';

import { AppContext } from '@/context/app.context';

interface InputProps {
  index?: number;
}

const Input = ({ index }: InputProps) => {
  const { commands, availableCommands } = useContext(AppContext);
  const commandsList = commands.getCommands();
  const [inputValue, setInputValue] = useState<string>('');
  const [comIndex, setComIndex] = useState<number>(commandsList.length - 1);

  const handlePressTab = (value: string, setValue: (value: string) => void) => {
    if (value === '') {
      return;
    }
    availableCommands.forEach((command: string) => {
      if (command.startsWith(value)) {
        setValue(command);
      }
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MIN_INDEX = 0;
    const NO_COMMANDS = 0;

    const hasCommands = commandsList.length !== NO_COMMANDS;
    const lastIndex = commandsList.length - 1;

    if (index === undefined && hasCommands) {
      return;
    }
    if (index === MIN_INDEX && commandsList.length > 1) {
      return;
    }
    if (index !== undefined && index < lastIndex) {
      return;
    }

    setInputValue(event.target.value);
  };

  const onSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setInputValue('');
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();

      commands.clear();
    }

    if (event.key === 'Tab') {
      event.preventDefault();

      handlePressTab(inputValue, setInputValue);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      commands.addCommand(inputValue);
      commands.getIndexOfCommand();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!commandsList.length) {
        return;
      }

      if (comIndex > 0) {
        setComIndex(comIndex - 1);
      }

      setInputValue(commandsList[comIndex]);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!commandsList.length) {
        return;
      }

      if (comIndex < commandsList.length - 1) {
        setComIndex(comIndex + 1);
      }

      setInputValue(commandsList[comIndex]);
    }
  };

  return (
    <input
      value={inputValue}
      onChange={onChange}
      className={styles.input}
      type="text"
      autoFocus
      autoComplete={'off'}
      autoCapitalize={'off'}
      autoCorrect={'off'}
      spellCheck={false}
      onKeyDown={onSubmit}
      id="commandInput"
    />
  );
};

export default Input;
