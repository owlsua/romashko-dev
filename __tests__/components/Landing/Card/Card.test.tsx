import { render, screen } from '@testing-library/react';
import Card from '@/components/Landing/Card/Card';

test('renders as link with correct href', () => {
  render(
    <Card href="/test" title="Test" symbol={<span>X</span>} label="label" />,
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/test');
});

test('renders title', () => {
  render(<Card href="/" title="my title" symbol={<span />} label="lbl" />);
  expect(screen.getByText('my title')).toBeInTheDocument();
});

test('renders label', () => {
  render(<Card href="/" title="t" symbol={<span />} label="my label" />);
  expect(screen.getByText('my label')).toBeInTheDocument();
});

test('renders symbol as ReactNode', () => {
  render(
    <Card
      href="/"
      title="t"
      symbol={<span data-testid="sym">icon</span>}
      label="l"
    />,
  );
  expect(screen.getByTestId('sym')).toBeInTheDocument();
});
