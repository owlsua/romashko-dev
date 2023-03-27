import { render, screen } from '@testing-library/react';
import CommandOutcome from '@/components/CommandOutcome/CommandOutcome';
import { AppContextProvider } from '@/context/app.context';

// const existCommand = { value: 'welcome' };
const existCommand = 'welcome';
const notExistCommand = 'notExist';

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

test('renders CommandOutcome', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <CommandOutcome command={existCommand} />
    </AppContextProvider>,
  );

  const outcome = screen.getByTestId('commandOutcome');
  expect(outcome).toBeInTheDocument();

  expect(outcome).toHaveTextContent(existCommand);
});

test('renders CommandOutcome with not exist command', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <CommandOutcome command={notExistCommand} />
    </AppContextProvider>,
  );

  const notFound = `Command not found: ${notExistCommand}. Try help to get started.`;

  const outcome = screen.getByTestId('commandOutcome');
  expect(outcome).toBeInTheDocument();

  expect(outcome).toHaveTextContent(notFound);
});

test('renders CommandOutcome with empty command', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <CommandOutcome command={''} />
    </AppContextProvider>,
  );

  expect(screen.queryByTestId('commandOutcome')).toBeNull();
});
