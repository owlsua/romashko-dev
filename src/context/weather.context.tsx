import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface WeatherData {
  temp: number;
  feels_like: number;
  description: string;
  city: string;
  country: string;
  humidity: number;
  wind_speed: number;
}

interface WeatherEntry {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

interface IWeatherContext {
  getWeather: (key: string) => WeatherEntry;
  fetchWeatherByCity: (key: string, cityName: string) => Promise<void>;
  fetchWeatherByCoords: (
    key: string,
    lat: number,
    lon: number,
  ) => Promise<void>;
  defaultKey: string;
}

const DEFAULT_CITY = 'Kyiv';

const defaultEntry: WeatherEntry = {
  data: null,
  loading: false,
  error: null,
};

const defaultValues: IWeatherContext = {
  getWeather: () => defaultEntry,
  fetchWeatherByCity: async () => {},
  fetchWeatherByCoords: async () => {},
  defaultKey: 'default',
};

interface OpenWeatherResponse {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function parseWeatherData(data: OpenWeatherResponse): WeatherData {
  return {
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed,
  };
}

export const WeatherContext = createContext<IWeatherContext>(defaultValues);

export const useWeather = () => useContext(WeatherContext);

interface WeatherContextProviderProps {
  children: ReactNode;
}

export const WeatherContextProvider = ({
  children,
}: WeatherContextProviderProps) => {
  const [cache, setCache] = useState<Record<string, WeatherEntry>>({});

  const updateEntry = (key: string, update: Partial<WeatherEntry>) => {
    setCache((prev) => ({
      ...prev,
      [key]: { ...defaultEntry, ...prev[key], ...update },
    }));
  };

  const getWeather = useCallback(
    (key: string): WeatherEntry => {
      return cache[key] || defaultEntry;
    },
    [cache],
  );

  const fetchWeatherByCity = useCallback(
    async (key: string, cityName: string) => {
      updateEntry(key, { loading: true, error: null });

      try {
        const response = await fetch(
          `/api/weather?q=${encodeURIComponent(cityName)}`,
        );
        if (!response.ok) {
          throw new Error(`City "${cityName}" not found`);
        }

        const data = await response.json();
        updateEntry(key, { data: parseWeatherData(data), loading: false });
      } catch (err) {
        updateEntry(key, {
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        });
      }
    },
    [],
  );

  const fetchWeatherByCoords = useCallback(
    async (key: string, lat: number, lon: number) => {
      updateEntry(key, { loading: true, error: null });

      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        updateEntry(key, { data: parseWeatherData(data), loading: false });
      } catch (err) {
        updateEntry(key, {
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        });
      }
    },
    [],
  );

  const value: IWeatherContext = {
    getWeather,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    defaultKey: 'default',
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
