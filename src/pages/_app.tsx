import { AppProps } from 'next/app';
import { ToastProvider } from '../contexts/ToastContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
