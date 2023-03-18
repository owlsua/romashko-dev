import { render, screen } from '@testing-library/react';
import About from '@/components/About/About';

const content = 'content';

test('renders About', () => {
  render(<About content={content} />);

  const about = screen.getByTestId('about');
  expect(about).toBeInTheDocument();

  const hello = screen.getByTestId('aboutHello');
  expect(hello).toBeInTheDocument();
  expect(hello).toHaveTextContent('Hello and welcome!');

  const contentEl = screen.getByTestId('aboutContent');
  expect(contentEl).toBeInTheDocument();
  expect(contentEl).toHaveTextContent(content);

  const aboutHelp = screen.getByTestId('aboutHelp');
  expect(aboutHelp).toBeInTheDocument();
  expect(aboutHelp).toHaveTextContent(
    "Type 'help' to see list of available commands.",
  );
});
