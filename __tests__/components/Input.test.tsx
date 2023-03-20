import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/Input/Input';
import { AppContextProvider } from '@/context/app.context';

const getCommandsMock = () => {
  return ['one', 'two', 'three'];
};

test('renders Input', () => {
  render(
    <AppContextProvider>
      <Input index={0} />
    </AppContextProvider>,
  );

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  expect(input).toHaveAttribute('id', 'commandInput');
  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveAttribute('autoComplete', 'off');
  expect(input).toHaveAttribute('autoCapitalize', 'off');
  expect(input).toHaveAttribute('autoCorrect', 'off');
  expect(input).toHaveAttribute('spellCheck', 'false');
});

test('updates input value on change', () => {
  render(
    <AppContextProvider>
      <Input index={0} />
    </AppContextProvider>,
  );

  const value = 'test';

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: value } });
  expect(input).toHaveValue(value);
});

test('adds command on Enter key press', () => {
  const addCommandMock = jest.fn();

  render(
    <AppContextProvider
      value={{
        commands: { addCommand: addCommandMock, getCommands: getCommandsMock },
      }}
    >
      <Input index={3} />
    </AppContextProvider>,
  );

  const value = 'test';

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: value } });
  expect(input).toHaveValue(value);

  fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  expect(addCommandMock).toHaveBeenCalled();
});

test('clears input on Ctrl+C key press', () => {
  render(
    <AppContextProvider>
      <Input index={0} />
    </AppContextProvider>,
  );

  const value = 'test';

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: value } });
  expect(input).toHaveValue(value);

  fireEvent.keyDown(input, { key: 'c', ctrlKey: true });
  expect(input).toHaveValue('');
});

test('clears commands on Ctrl+L key press', () => {
  const clearCommandsMock = jest.fn();
  render(
    <AppContextProvider
      value={{
        commands: { clear: clearCommandsMock, getCommands: getCommandsMock },
      }}
    >
      <Input index={0} />
    </AppContextProvider>,
  );

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'l', ctrlKey: true });
  expect(clearCommandsMock).toHaveBeenCalled();
});

test('updates input value on Tab key press', () => {
  const availableCommands = ['one', 'two', 'three'];
  render(
    <AppContextProvider
      value={{
        availableCommands,
        commands: { getCommands: getCommandsMock },
      }}
    >
      <Input index={3} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 't' } });
  expect(input).toHaveValue('t');

  fireEvent.keyDown(input, { key: 'Tab' });
  expect(input).toHaveValue('three');
});

test('updates input value on ArrowUp key press', () => {
  render(
    <AppContextProvider
      value={{
        commands: { getCommands: getCommandsMock },
      }}
    >
      <Input index={3} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveValue('three');

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveValue('two');
});

test('updates input value on ArrowDown key press', () => {
  render(
    <AppContextProvider
      value={{
        commands: { getCommands: getCommandsMock },
      }}
    >
      <Input index={3} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveValue('three');

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveValue('two');

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveValue('one');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveValue('two');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveValue('three');
});
