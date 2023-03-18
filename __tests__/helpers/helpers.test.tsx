import { openLink } from '@/helpers/helpers';

test('open link', () => {
  // Setup
  const mockedOpen = jest.fn();
  const mockWindow = Object.create(window);
  Object.defineProperty(mockWindow, 'open', { value: mockedOpen });
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => mockWindow);

  // Tests
  openLink('link');
  expect(mockedOpen).toBeCalled();

  // Cleanup
  windowSpy.mockRestore();
});
