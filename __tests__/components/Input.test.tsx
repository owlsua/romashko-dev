import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/Input/Input';
import { AppContextProvider } from '@/context/app.context';

const getCommandsMock = () => {
  return ['one', 'two', 'three'];
};
const availableCommandsMock = ['one', 'two', 'three'];
const addCommandMock = jest.fn();
const clearCommandsMock = jest.fn();

const contextValueMock = {
  commands: {
    addCommand: addCommandMock,
    getCommands: getCommandsMock,
    clear: clearCommandsMock,
    commands: [{ value: 'test' }],
  },
  availableCommands: availableCommandsMock,
  aboutContent: '',
  components: {},
};

const contextValueEmptyHystoryMock = {
  commands: {
    addCommand: addCommandMock,
    getCommands: () => [],
    clear: clearCommandsMock,
    commands: [{ value: 'test' }],
  },
  availableCommands: [],
  aboutContent: '',
  components: {},
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
  expect(input).toHaveAttribute('autoComplete', 'none');
  expect(input).toHaveAttribute('autoCapitalize', 'none');
  expect(input).toHaveAttribute('autoCorrect', 'none');
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
  render(
    <AppContextProvider value={contextValueMock}>
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
  render(
    <AppContextProvider value={contextValueMock}>
      <Input index={0} />
    </AppContextProvider>,
  );

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'l', ctrlKey: true });
  expect(clearCommandsMock).toHaveBeenCalled();
});

test('updates input value on Tab key press', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <Input index={3} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'Tab' });
  expect(input).toHaveValue('');

  fireEvent.change(input, { target: { value: 't' } });
  expect(input).toHaveValue('t');

  fireEvent.keyDown(input, { key: 'Tab' });
  expect(input).toHaveValue('three');
});

test('updates input value on ArrowUp key press with empty history', () => {
  render(
    <AppContextProvider value={contextValueEmptyHystoryMock}>
      <Input index={3} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  expect(input).toHaveValue('');

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveValue('');
});

test('updates input value on ArrowUp key press with history', () => {
  render(
    <AppContextProvider value={contextValueMock}>
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

test('updates input value on ArrowDown key press without history', () => {
  render(
    <AppContextProvider value={contextValueEmptyHystoryMock}>
      <Input index={3} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveValue('');
});

test('updates input value on ArrowDown key press with history', () => {
  render(
    <AppContextProvider value={contextValueMock}>
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

test('updates input value without index', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <Input index={undefined} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: 't' } });
  expect(input).toHaveValue('');
});

test('updates input value with 0 index and history', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <Input index={0} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: 't' } });
  expect(input).toHaveValue('');
});

test('updates input value with non-last index and history', () => {
  render(
    <AppContextProvider value={contextValueMock}>
      <Input index={1} />
    </AppContextProvider>,
  );
  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();

  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: 't' } });
  expect(input).toHaveValue('');
});
