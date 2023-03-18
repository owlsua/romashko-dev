import { render, screen } from '@testing-library/react';
import Welcome from '@/components/Welcome/Welcome';

test('renders Title', () => {
  render(<Welcome />);

  const welcome = screen.getByTestId('welcome');
  const title = screen.getByTestId('title');
  const about = screen.getByTestId('about');

  expect(welcome).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(about).toBeInTheDocument();
});
