import { render, screen } from '@testing-library/react';
import MainFlow from '@/components/MainFlow/MainFlow';
import { AppContextProvider } from '@/context/app.context';

const getCommandsMock = () => {
  return ['one', 'two', 'three'];
};
const availableCommandsMock = ['welcome'];
const addCommandMock = jest.fn();
const clearCommandsMock = jest.fn();

const contextValueMock = {
  commands: {
    addCommand: addCommandMock,
    getCommands: getCommandsMock,
    clear: clearCommandsMock,
    commands: [{ value: 'welcome' }],
  },
  availableCommands: availableCommandsMock,
  aboutContent: '',
  components: { welcome: 'welcome' },
};

test('renders Main Flow', () => {
  render(
    <AppContextProvider value={contextValueMock}>
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
