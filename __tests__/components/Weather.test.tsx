import { render, screen } from '@testing-library/react';
import Weather from '@/components/Weather/Weather';
import { WeatherContext } from '@/context/weather.context';

describe('Weather component', () => {
  const getWeather = jest.fn();
  const fetchWeatherByCity = jest.fn();

  const renderWithContext = (component: React.ReactElement) => {
    return render(
      <WeatherContext.Provider
        value={{
          getWeather,
          fetchWeatherByCity,
          defaultKey: 'default',
        }}
      >
        {component}
      </WeatherContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    getWeather.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithContext(<Weather />);

    expect(screen.getByText(/fetching weather data/i)).toBeInTheDocument();
    expect(fetchWeatherByCity).not.toHaveBeenCalled();
    expect(getWeather).toHaveBeenCalledWith('default');
  });

  test('renders error state', () => {
    getWeather.mockReturnValue({
      data: null,
      loading: false,
      error: 'Something went wrong',
    });

    renderWithContext(<Weather />);

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  test('renders weather data', () => {
    getWeather.mockReturnValue({
      data: {
        temp: 21,
        feels_like: 19,
        description: 'clear sky',
        city: 'Kyiv',
        country: 'UA',
        humidity: 44,
        wind_speed: 3.5,
      },
      loading: false,
      error: null,
    });

    renderWithContext(<Weather />);

    expect(screen.getByText('Kyiv, UA')).toBeInTheDocument();
    expect(screen.getByText('21°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 19°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 44%')).toBeInTheDocument();
    expect(screen.getByText('Wind: 3.5 m/s')).toBeInTheDocument();
  });

  test('returns null when there is no weather data', () => {
    getWeather.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    const { container } = renderWithContext(<Weather />);

    expect(container).toBeEmptyDOMElement();
  });

  test('fetches weather when city prop is provided', () => {
    getWeather.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithContext(<Weather city="Lviv" />);

    expect(getWeather).toHaveBeenCalledWith(expect.stringContaining('city-'));
    expect(fetchWeatherByCity).toHaveBeenCalledWith(
      expect.stringContaining('city-'),
      'Lviv',
    );
  });
});
