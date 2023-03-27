import { createContext, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CommandsStore from '@/stores/commandsStore';

import Welcome from '@/components/Welcome/Welcome';
import Help from '@/components/Help/Help';
import About from '@/components/About/About';
import ExternalLink from '@/components/ExternalLink/ExternalLink';

interface IComponents {
  [key: string]: JSX.Element | string;
}

interface AppContextProviderProps {
  value?: IAppContext;
  children: JSX.Element;
}

interface CommandsTypes {
  getCommands: () => string[];
  addCommand: (command: string) => void;
  commands: { value: string }[];
  clear: () => void;
}
interface IAppContext {
  components: IComponents;
  commands: CommandsTypes;
  availableCommands: string[];
  aboutContent: string;
}

const defaultValues: IAppContext = {
  components: {},
  commands: {
    getCommands: () => [],
    addCommand: () => {},
    commands: [],
    clear: () => {},
  },
  availableCommands: [],
  aboutContent: '',
};

export const AppContext = createContext(defaultValues);

export const AppContextProvider = ({
  value: propValue,
  children,
}: AppContextProviderProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const commands = useLocalObservable(() =>
    CommandsStore.create({ commands: [{ value: 'welcome' }] }),
  );

  const aboutContent =
    "I'm Alexander Romashko and this is my personal website where you can explore my projects and learn more about me by interacting with the app using a command-line interface.";
  const githubLink = 'https://github.com/owlsua';
  const githubMessage = 'opening Github...';
  const linkedinLink = 'https://www.linkedin.com/in/owlsua/';
  const linkedinMessage = 'opening LinkedIn...';
  const emailLink = 'mailto:allatsnow@gmail.com';
  const emailMessage = 'opening email...';
  const repoLink = 'https://github.com/owlsua/romashko-dev';
  const repoMessage = 'opening repo...';
  const cvLink =
    'https://drive.google.com/file/d/1WM-h4cGX1uCzkYmpFiZsIG9gSIKseo2Q/view';
  const cvMessage = 'opening cv...';

  const components: IComponents = {
    welcome: <Welcome />,
    help: <Help />,
    about: <About content={aboutContent} />,
    github: <ExternalLink link={githubLink} message={githubMessage} />,
    linkedin: <ExternalLink link={linkedinLink} message={linkedinMessage} />,
    email: <ExternalLink link={emailLink} message={emailMessage} />,
    repo: <ExternalLink link={repoLink} message={repoMessage} />,
    cv: <ExternalLink link={cvLink} message={cvMessage} />,
    // add more commands here
  };

  const availableCommands = Object.keys(components);

  const value = {
    commands,
    inputValue,
    setInputValue,
    components,
    availableCommands,
    aboutContent,
  };

  return (
    <AppContext.Provider value={propValue || value}>
      {children}
    </AppContext.Provider>
  );
};
