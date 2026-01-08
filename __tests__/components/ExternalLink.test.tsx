import { render, screen } from '@testing-library/react';
import ExternalLink from '@/components/ExternalLink/ExternalLink';

test('renders External Link', () => {
  const mockedOpen = jest.fn();
  jest.spyOn(window, 'open').mockImplementation(mockedOpen);

  const link = 'https://romashko.dev';
  const message = 'opening...';
  render(<ExternalLink link={link} message={message} />);

  const externalLink = screen.getByTestId('externalLink');
  expect(externalLink).toBeInTheDocument();
  expect(externalLink).toHaveTextContent(message);
  expect(mockedOpen).toHaveBeenCalled();
  jest.restoreAllMocks();
});
