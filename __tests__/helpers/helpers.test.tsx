import { openLink } from '@/helpers/helpers';

test('open link', () => {
  // Setup
  const mockedOpen = jest.fn();
  jest.spyOn(window, 'open').mockImplementation(mockedOpen);
  openLink('link');
  expect(mockedOpen).toHaveBeenCalled();
  jest.restoreAllMocks();
});
