import { AppProps } from 'next/app';
import { ToastProvider } from '../contexts/ToastContext';
import Layout from '@/components/layouts/Layout';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}

export default MyApp;
