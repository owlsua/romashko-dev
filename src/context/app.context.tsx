import { createContext, PropsWithChildren, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CommandsStore from '@/stores/commandsStore';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import Welcome from '@/components/Welcome/Welcome';
import Help from '@/components/Help/Help';

interface IComponents {
  [key: string]: JSX.Element | string;
}
export interface IAppContext {
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

export const AppContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const commands = useLocalObservable(() =>
    CommandsStore.create({ commands: [{ value: 'about' }] }),
  );

  const components: IComponents = {
    help: '',
    about: '',
    github: '',
    linkedin: '',
    email: '',
    // add more commands here
  };

  const availableCommands = Object.keys(components);

  return (
    <AppContext.Provider
      value={{
        commands,
        inputValue,
        setInputValue,
        components,
        availableCommands,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
