import { useContext, useEffect, useId } from 'react';
import { WeatherContext } from '@/context/weather.context';
import styles from './styles.module.css';

interface WeatherProps {
  city?: string;
}

export default function Weather({ city }: WeatherProps) {
  const id = useId();
  const { getWeather, fetchWeatherByCity, defaultKey } =
    useContext(WeatherContext);

  const key = city ? `city-${id}` : defaultKey;
  const { data: weather, loading, error } = getWeather(key);

  useEffect(() => {
    if (city) {
      fetchWeatherByCity(key, city);
    }
  }, [city, key, fetchWeatherByCity]);

  if (loading) {
    return (
      <div className={styles.weather}>
        <div className={styles.loading}>
          <span className={styles.prompt}>$</span>
          <span className={styles.loadingText}>
            fetching weather data
            <span className={styles.dots}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.weather}>Error: {error}</div>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div className={styles.weather}>
      <div className={styles.header}>
        <span className={styles.city}>
          {weather.city}, {weather.country}
        </span>
      </div>
      <div className={styles.main}>
        <span className={styles.temp}>{weather.temp}°C</span>
        <span className={styles.description}>{weather.description}</span>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>Feels like: {weather.feels_like}°C</div>
        <div className={styles.detail}>Humidity: {weather.humidity}%</div>
        <div className={styles.detail}>Wind: {weather.wind_speed} m/s</div>
      </div>
    </div>
  );
}
