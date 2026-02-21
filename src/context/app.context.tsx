import { createContext, JSX, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CommandsStore from '@/stores/commandsStore';

import Welcome from '@/components/Welcome/Welcome';
import Help from '@/components/Help/Help';
import About from '@/components/About/About';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import Skills from '@/components/Skills/Skills';
import Weather from '@/components/Weather/Weather';
import { getSiteConfig } from '@/config/siteConfig';
import type {
  AppContextProviderProps,
  IAppContext,
  IComponents,
} from '@/interfaces/app-context.interface';

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

  const { aboutContent, skills, links } = getSiteConfig();

  const linkComponents = Object.fromEntries(
    links
      .filter((l) => l.url)
      .map((l) => [
        l.key,
        <ExternalLink key={l.key} link={l.url} message={l.message} />,
      ]),
  );

  const components: IComponents = {
    welcome: <Welcome />,
    help: <Help />,
    about: <About content={aboutContent} />,
    ...linkComponents,
    skills: <Skills skills={skills} />,
    weather: <Weather />,
    gui: <ExternalLink link="/gui" message="opening gui page..." />,
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
