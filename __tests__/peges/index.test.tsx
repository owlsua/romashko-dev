import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });
});
