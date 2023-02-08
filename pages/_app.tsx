import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/supabase-js';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Roboto } from '@next/font/google';
import { BookingProvider } from '@context/BookingContext';
import { RequestProvider } from '@context/RequestContext';
import { TurfProvider } from '@context/TurfContext';
import { UserProfileProvider } from '@context/UserProfileContext';
import Transition from '@components/Transition';

import '../styles/globals.css';

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
        <Transition>
          <RequestProvider>
            <BookingProvider>
              <TurfProvider>
                <UserProfileProvider>
                  <main className={inter.className}>
                    <Toaster position="top-right" />
                    <Component {...pageProps} />
                  </main>
                </UserProfileProvider>
              </TurfProvider>
            </BookingProvider>
          </RequestProvider>
        </Transition>
      </SessionContextProvider>
    </>
  );
}

export default App;
