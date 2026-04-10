import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import CookieBannerTerminal from '@/components/CookieBanner/CookieBannerTerminal';

const mockAccept = jest.fn();
let mockVisible = true;

jest.mock('@/hooks/useCookieConsent', () => ({
  useCookieConsent: () => ({
    visible: mockVisible,
    accept: mockAccept,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  mockVisible = true;
});

afterEach(() => {
  jest.useRealTimers();
});

const FULL_TEXT = 'This site uses only strictly necessary cookies.';

test('renders nothing when not visible', () => {
  mockVisible = false;
  render(<CookieBannerTerminal />);
  expect(screen.queryByText('guest')).not.toBeInTheDocument();
});

test('renders prompt line when visible', () => {
  render(<CookieBannerTerminal />);
  expect(screen.getByText('guest')).toBeInTheDocument();
  expect(screen.getByText('romashko.dev')).toBeInTheDocument();
  expect(screen.getByText('cookies --accept-all')).toBeInTheDocument();
});

test('shows cursor during typing', () => {
  render(<CookieBannerTerminal />);

  act(() => {
    jest.advanceTimersByTime(30);
  });

  expect(screen.getByText('|')).toBeInTheDocument();
});

test('shows accept button after typing completes', async () => {
  render(<CookieBannerTerminal />);

  act(() => {
    jest.advanceTimersByTime(30 * FULL_TEXT.length + 10);
  });

  const button = await screen.findByRole('button', { name: /accept/i });
  expect(button).toBeInTheDocument();
});

test('accept button calls accept from hook', async () => {
  render(<CookieBannerTerminal />);

  act(() => {
    jest.advanceTimersByTime(30 * FULL_TEXT.length + 10);
  });

  const button = await screen.findByRole('button', { name: /accept/i });
  fireEvent.click(button);

  expect(mockAccept).toHaveBeenCalledTimes(1);
});
