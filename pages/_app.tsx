import { useState } from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { Session } from '@supabase/auth-helpers-react';
import Transition from '@components/Transition';
import Navbar from '@components/Navbar';

import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

const Head = dynamic(() => import('@components/Head'));
const Context = dynamic(() => import('@components/Context'));

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
      <Head />
      <Toaster position="top-right" />
      <Context initialSession={pageProps.initialSession} supabase={supabase}>
        {router.pathname.includes('user') ||
        router.pathname === '/community' ||
        router.pathname.includes('lister') ||
        router.pathname.includes('moderator') ? (
          <>
            <Navbar />
            <Transition>
              <Component {...pageProps} className={inter.className} />
            </Transition>
          </>
        ) : (
          <Transition>
            <Component {...pageProps} className={inter.className} />
          </Transition>
        )}
      </Context>
    </>
  );
}

export default App;
