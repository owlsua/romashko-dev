import { render, screen } from '@testing-library/react';
import MainFlow from '@/components/MainFlow/MainFlow';
import { AppContextProvider } from '@/context/app.context';

const commands = [
  {
    value: 'welcome',
  },
];

const components = {
  welcome: 'welcome',
};

const getCommandsMock = () => {
  return ['welcome'];
};

test('renders Main Flow', () => {
  render(
    <AppContextProvider
      value={{
        commands: {
          commands: commands,
          getCommands: getCommandsMock,
        },
        components: components,
      }}
    >
      <MainFlow />
    </AppContextProvider>,
  );

  const mainFlow = screen.getByTestId('mainFlow');
  const prompts = screen.getAllByTestId('prompt');
  const commandOutcomes = screen.getAllByTestId('commandOutcome');

  expect(mainFlow).toBeInTheDocument();
  expect(prompts).toHaveLength(2);
  expect(commandOutcomes).toHaveLength(1);
  expect(commandOutcomes[0]).toHaveTextContent('welcome');
});
