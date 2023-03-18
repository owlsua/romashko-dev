import { createContext, PropsWithChildren, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CommandsStore from '@/stores/commandsStore';

interface IComponents {
  [key: string]: JSX.Element | string;
}
interface IAppContext {
  components: IComponents;
  commands: any;
  inputValue: string;
  availableCommands: string[];
  setInputValue: (inputValue: string) => void;
}

const defaultValues: IAppContext = {
  components: {},
  commands: {},
  availableCommands: [],
  inputValue: '',
  setInputValue: () => {},
};

export const AppContext = createContext(defaultValues);

export const AppContextProvider = ({
  value: propValue,
  children,
}: PropsWithChildren<any>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const commands = useLocalObservable(() =>
    CommandsStore.create({ commands: [{ value: 'welcome' }] }),
  );

  const components: IComponents = {
    welcome: 'welcome',
    help: 'help',
    about: 'about',
    github: 'github',
    linkedin: 'linkedin',
    email: 'email',
    // add more commands here
  };

  const availableCommands = Object.keys(components);

  const value = {
    commands,
    inputValue,
    setInputValue,
    components,
    availableCommands,
  };

  return (
    <AppContext.Provider value={propValue || value}>
      {children}
    </AppContext.Provider>
  );
};
