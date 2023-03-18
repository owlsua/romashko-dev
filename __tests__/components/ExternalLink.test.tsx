import { render, screen } from '@testing-library/react';
import ExternalLink from '@/components/ExternalLink/ExternalLink';

test('renders External Link', () => {
  const mockedOpen = jest.fn();
  const mockWindow = Object.create(window);
  Object.defineProperty(mockWindow, 'open', { value: mockedOpen });
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => mockWindow);

  const link = 'https://romashko.dev';
  const message = 'opening...';
  render(<ExternalLink link={link} message={message} />);

  const externalLink = screen.getByTestId('externalLink');
  expect(externalLink).toBeInTheDocument();

  expect(externalLink).toHaveTextContent(message);

  expect(mockedOpen).toBeCalled();

  windowSpy.mockRestore();
});
