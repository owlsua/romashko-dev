import { createContext, PropsWithChildren, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CommandsStore from '@/stores/commandsStore';
export interface IAppContext {
  commands: any;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

const defaultValues: IAppContext = {
  commands: {},
  inputValue: '',
  setInputValue: () => {},
};

export const AppContext = createContext(defaultValues);

export const AppContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const commands = useLocalObservable(() =>
    CommandsStore.create({ commands: [{ value: 'about' }] }),
  );

  return (
    <AppContext.Provider
      value={{
        commands,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
