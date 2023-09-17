import { createContext, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CommandsStore from '@/stores/commandsStore';

import Welcome from '@/components/Welcome/Welcome';
import Help from '@/components/Help/Help';
import About from '@/components/About/About';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import Skills from '@/components/Skills/Skills';

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

  const aboutContent = process.env.NEXT_PUBLIC_ABOUT || '';
  const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK || '';
  const githubMessage = 'opening Github...';
  const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_LINK || '';
  const linkedinMessage = 'opening LinkedIn...';
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || '';
  const telegramMessage = 'opening Telegram...';
  const emailLink = process.env.NEXT_PUBLIC_EMAIL_LINK || '';
  const emailMessage = 'opening email...';
  const repoLink = process.env.NEXT_PUBLIC_REPO_LINK || '';
  const repoMessage = 'opening repo...';
  const cvLink = process.env.NEXT_PUBLIC_CV_LINK || '';
  const cvMessage = 'opening cv...';
  const skillsRow = process.env.NEXT_PUBLIC_SKILLS || '';
  const skillsArray = skillsRow.split(', ');

  const components: IComponents = {
    welcome: <Welcome />,
    help: <Help />,
    about: <About content={aboutContent} />,
    github: <ExternalLink link={githubLink} message={githubMessage} />,
    linkedin: <ExternalLink link={linkedinLink} message={linkedinMessage} />,
    telegram: <ExternalLink link={telegramLink} message={telegramMessage} />,
    email: <ExternalLink link={emailLink} message={emailMessage} />,
    repo: <ExternalLink link={repoLink} message={repoMessage} />,
    cv: <ExternalLink link={cvLink} message={cvMessage} />,
    skills: <Skills skills={skillsArray} />,
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
