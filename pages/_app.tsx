import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '@/context/app.context';
import { WeatherContextProvider } from '@/context/weather.context';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WeatherContextProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </WeatherContextProvider>
  );
}
