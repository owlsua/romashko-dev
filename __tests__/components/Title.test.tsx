import { render, screen } from '@testing-library/react';
import Title from '@/components/Title/Title';

const title = 'single';
const titleArr = ['one', 'two'];

test('renders Title', () => {
  render(<Title title={title} />);

  expect(screen.getByTestId('title')).toBeInTheDocument();
  expect(screen.getByTestId('title')).toHaveTextContent(title);

  expect(screen.queryByTestId('subtitle')).not.toBeInTheDocument();
});

test('renders Title with subtitle', () => {
  render(<Title title={titleArr} />);

  expect(screen.getByTestId('title')).toBeInTheDocument();
  expect(screen.getByTestId('title')).toHaveTextContent(titleArr[0]);

  expect(screen.getByTestId('subtitle')).toBeInTheDocument();
  expect(screen.getByTestId('subtitle')).toHaveTextContent(titleArr[1]);
});
