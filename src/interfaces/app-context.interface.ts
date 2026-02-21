import type { JSX } from 'react';

export interface IComponents {
  [key: string]: JSX.Element | string;
}

export interface CommandsTypes {
  getCommands: () => string[];
  addCommand: (command: string) => void;
  commands: { value: string }[];
  clear: () => void;
}

export interface IAppContext {
  components: IComponents;
  commands: CommandsTypes;
  availableCommands: string[];
  aboutContent: string;
}

export interface AppContextProviderProps {
  value?: IAppContext;
  children: JSX.Element;
}
