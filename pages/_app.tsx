import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '@/context/app.context';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
