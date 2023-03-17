import { render, screen } from '@testing-library/react';
import Prompt from '@/components/Prompt/Prompt';
import { AppContextProvider } from '@/context/app.context';

test('renders Prompt', () => {
  render(
    <AppContextProvider>
      <Prompt index={0} />
    </AppContextProvider>,
  );

  const prompt = screen.getByTestId('prompt');
  expect(prompt).toBeInTheDocument();

  const label = screen.getByTestId('label');
  expect(label).toBeInTheDocument();
  expect(label).toHaveAttribute('for', 'commandInput');

  const userName = screen.getByTestId('userName');
  expect(userName).toBeInTheDocument();
  expect(userName).toHaveTextContent('guest');

  const atSign = screen.getByTestId('atSign');
  expect(atSign).toBeInTheDocument();
  expect(atSign).toHaveTextContent('@');

  const productName = screen.getByTestId('productName');
  expect(productName).toBeInTheDocument();
  expect(productName).toHaveTextContent('romashko.dev');

  const last = screen.getByTestId('last');
  expect(last).toBeInTheDocument();
  expect(last).toHaveTextContent(':$ ~');

  const input = screen.getByTestId('commandInput');
  expect(input).toBeInTheDocument();
});
