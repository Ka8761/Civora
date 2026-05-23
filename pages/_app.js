import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#112240',
            color: '#fff',
            border: '1px solid rgba(201,146,26,0.3)',
          },
          success: { iconTheme: { primary: '#4caf50', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </SessionProvider>
  );
}
