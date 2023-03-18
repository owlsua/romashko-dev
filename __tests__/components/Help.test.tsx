import { render, screen } from '@testing-library/react';
import Help from '@/components/Help/Help';
import { CommandList, HotKeyList } from '@/components/Help/Help';

const commands = ['help', 'about', 'contact', 'projects', 'skills'];

const hotKeys = [
  {
    key: 'one',
    description: 'first command',
  },
  {
    key: 'two',
    description: 'second command',
  },
  {
    key: 'three',
    description: 'third command',
  },
];

test('renders CommandList', () => {
  render(<CommandList commands={commands} />);

  const commandList = screen.getByTestId('commandList');
  const commandItems = screen.getAllByTestId('commandItem');

  expect(commandList).toBeInTheDocument();
  expect(commandItems).toHaveLength(commands.length);

  commandItems.forEach((item, index) => {
    expect(item).toHaveTextContent(commands[index]);
  });
});

test('renders HotKeyList', () => {
  render(<HotKeyList hotKeys={hotKeys} />);
  const hotKeyList = screen.getByTestId('hotKeyList');
  const hotKeyItems = screen.getAllByTestId('hotKeyItem');

  expect(hotKeyList).toBeInTheDocument();
  expect(hotKeyItems).toHaveLength(hotKeys.length);

  hotKeyItems.forEach((item, index) => {
    expect(item).toHaveTextContent(hotKeys[index].key);
    expect(item).toHaveTextContent(hotKeys[index].description);
  });
});

test('renders Title', () => {
  render(<Help />);

  const help = screen.getByTestId('help');
  const title = screen.getByTestId('helpTitle');
  const commands = screen.getByTestId('commandList');
  const hotKeys = screen.getByTestId('hotKeyList');

  expect(help).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Available commands:');
  expect(commands).toBeInTheDocument();
  expect(hotKeys).toBeInTheDocument();
});
