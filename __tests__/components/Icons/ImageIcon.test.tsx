import { render, screen } from '@testing-library/react';
import ImageIcon from '@/components/Icons/ImageIcon';

test('renders svg element with correct viewBox', () => {
  render(<ImageIcon data-testid="icon" />);
  const svg = screen.getByTestId('icon');
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
});

test('applies custom props', () => {
  render(<ImageIcon data-testid="icon" width={42} height={42} />);
  const svg = screen.getByTestId('icon');
  expect(svg).toHaveAttribute('width', '42');
  expect(svg).toHaveAttribute('height', '42');
});
