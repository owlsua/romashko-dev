import { render, screen } from '@testing-library/react';
import Landing from '@/components/Landing/Landing';

jest.mock('@/components/Starfield/Starfield', () => {
  const MockStarfield = () => <div data-testid="starfield" />;
  MockStarfield.displayName = 'MockStarfield';
  return MockStarfield;
});

test('renders title and subtitle', () => {
  render(<Landing />);
  expect(screen.getByText('Romashko.dev')).toBeInTheDocument();
  expect(screen.getByText('select interface')).toBeInTheDocument();
});

test('renders starfield', () => {
  render(<Landing />);
  expect(screen.getByTestId('starfield')).toBeInTheDocument();
});

test('renders terminal card', () => {
  render(<Landing />);
  expect(screen.getByText('terminal')).toBeInTheDocument();
  expect(screen.getByText('command line')).toBeInTheDocument();
});

test('renders gui card', () => {
  render(<Landing />);
  expect(screen.getByText('gui')).toBeInTheDocument();
  expect(screen.getByText('graphical')).toBeInTheDocument();
});

test('renders two navigation links', () => {
  render(<Landing />);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute('href', '/terminal');
  expect(links[1]).toHaveAttribute('href', '/gui');
});
