import '../styles/globals.css';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css' ; 
import 'react-clock/dist/Clock.css';
import type { AppProps } from 'next/app';

import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import {
  createBrowserSupabaseClient,
  Session
} from '@supabase/auth-helpers-nextjs';
import { UserProfileProvider } from '../src/context/UserProfileContext';
import { TurfProvider } from '../src/context/TurfContext';
import { Roboto } from '@next/font/google';
import { BookingProvider } from '../src/context/BookingContext';
import { RequestProvider } from '../src/context/RequestContext';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

function App({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <Head>
        {/* Add a meta tag for SEO */}
        <meta
          name="description"
          content="My Next.js App is a modern and powerful web application built with Next.js."
        />
        {/* Add a meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add a meta tag for author */}
        <meta name="author" content="PlayPal Team" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <RequestProvider>
          <BookingProvider>
            <TurfProvider>
              <UserProfileProvider>
                <main className={inter.className}>
                  <Toaster />
                  <Component {...pageProps} />
                </main>
              </UserProfileProvider>
            </TurfProvider>
          </BookingProvider>
        </RequestProvider>
      </SessionContextProvider>
    </>
  );
}

export default App;
