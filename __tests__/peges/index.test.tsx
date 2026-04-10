import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

test('Home', () => {
  render(<Home />);
  expect(screen.getByText('Romashko.dev')).toBeInTheDocument();
  expect(screen.getByText('select interface')).toBeInTheDocument();
});
