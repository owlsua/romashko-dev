import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { AppContextProvider } from '@/context/app.context';

test('Home', () => {
  render(
    <AppContextProvider>
      <Home />
    </AppContextProvider>,
  );
  const main = screen.getByRole('main');
  expect(main).toBeInTheDocument();
});
