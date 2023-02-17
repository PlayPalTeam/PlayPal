import Head from 'next/head';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Roboto } from '@next/font/google';
import { useRouter } from 'next/router';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { BookingProvider } from '@context/BookingContext';
import { RequestProvider } from '@context/RequestContext';
import { TurfProvider } from '@context/TurfContext';
import { UserProfileProvider } from '@context/UserProfileContext';
import Transition from '@components/Transition';

import '../styles/globals.css';
import Layout from '@components/Layout';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

function App({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Your one-stop solution for listing, booking, and requesting sports turfs. Whether you're a turf owner or an athlete looking for a space to play, TurfConnect is here to make your life easier. List your turf and make it available for booking to sports enthusiasts in your area. Need a turf? Create a booking request and find the perfect space to play. Get started with TurfConnect today and simplify your turf experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="PlayPal Team" />
      </Head>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <RequestProvider>
          <BookingProvider>
            <TurfProvider>
              <UserProfileProvider>
                {router.pathname.includes('user') ||
                router.pathname === '/community' ||
                router.pathname.includes('lister') ||
                router.pathname.includes('moderator') ? (
                  <Layout title="">
                    <Transition>
                      <main className={inter.className}>
                        <Toaster position="top-right" />
                        <Component {...pageProps} />
                      </main>
                    </Transition>
                  </Layout>
                ) : (
                  <Transition>
                    <main className={inter.className}>
                      <Toaster position="top-right" />
                      <Component {...pageProps} />
                    </main>
                  </Transition>
                )}
              </UserProfileProvider>
            </TurfProvider>
          </BookingProvider>
        </RequestProvider>
      </SessionContextProvider>
    </>
  );
}

export default App;
