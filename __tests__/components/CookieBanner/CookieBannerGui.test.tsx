import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import CookieBannerGui from '@/components/CookieBanner/CookieBannerGui';

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

test('renders nothing when not visible', () => {
  mockVisible = false;
  render(<CookieBannerGui />);
  expect(
    screen.queryByText(/strictly necessary cookies/i),
  ).not.toBeInTheDocument();
});

test('renders cookie banner when visible', () => {
  render(<CookieBannerGui />);
  expect(screen.getByText(/strictly necessary cookies/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument();
});

test('accept button triggers retract animation then calls accept', () => {
  render(<CookieBannerGui />);
  const button = screen.getByRole('button', { name: /accept/i });

  fireEvent.click(button);

  expect(mockAccept).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(600);
  });

  expect(mockAccept).toHaveBeenCalledTimes(1);
});
