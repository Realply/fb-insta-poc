import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import "aos/dist/aos.css";


const montserrat = Montserrat({ subsets: ['latin'] });

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  
  return (
    <SessionProvider
        session={session}
        refetchOnWindowFocus
        refetchInterval={5 * 60}
      >

    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>
    </SessionProvider>
  );
}
