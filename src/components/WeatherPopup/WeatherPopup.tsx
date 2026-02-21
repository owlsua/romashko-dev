import { useState, useContext } from 'react';
import { WeatherContext } from '@/context/weather.context';
import Weather from '@/components/Weather/Weather';
import styles from './styles.module.css';

const WeatherPopup = () => {
  const { fetchWeatherByCity, defaultKey } = useContext(WeatherContext);

  const [cityInput, setCityInput] = useState('');
  const [submittedCity, setSubmittedCity] = useState<string | undefined>(
    undefined,
  );
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = cityInput.trim();
    if (!next) return;
    setGeoError(null);
    setSubmittedCity(next);
  };

  const handleCurrentLocation = () => {
    setGeoError(null);

    const secure =
      window.isSecureContext ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (!secure) {
      setGeoError('Available only on HTTPS or localhost.');
      return;
    }

    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation not supported in this browser.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (res.ok) {
          const data = await res.json();
          const cityName: string = data.name;
          await fetchWeatherByCity(defaultKey, cityName);
          setCityInput(cityName);
          setSubmittedCity(undefined);
        } else {
          setGeoError('Could not fetch weather for your location.');
        }
        setLocating(false);
      },
      () => {
        setGeoError('Unable to get your location.');
        setLocating(false);
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.controls} onSubmit={handleSearch}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search city..."
          className={styles.input}
          aria-label="City name"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={handleCurrentLocation}
          disabled={locating}
        >
          {locating ? 'Locating...' : 'Current Location'}
        </button>
      </form>

      {geoError !== null ? (
        <div className={styles.error}>{geoError}</div>
      ) : null}

      <Weather city={submittedCity} />
    </div>
  );
};

export default WeatherPopup;
