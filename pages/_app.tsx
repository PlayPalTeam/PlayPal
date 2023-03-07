import { useState } from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Session } from '@supabase/auth-helpers-nextjs';
import '../styles/globals.css';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

const Navbar = dynamic(() => import('@components/Navbar'));
const Transition = dynamic(() => import('@components/Transition'));
const Head = dynamic(() => import('@components/Head'));
const Context = dynamic(() => import('@components/Context'));

function App({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  const { pathname } = useRouter();

  const showNavbar = pathname.includes('user') || pathname === '/community' || pathname.includes('lister') || pathname.includes('moderator');

  return (
    <>
      <Head />
      <Toaster position="top-right" />
      <Context initialSession={pageProps.initialSession}>
        {showNavbar && <Navbar />}
        <Transition>
          <Component {...pageProps} className={inter.className} />
        </Transition>
      </Context>
    </>
  );
}

export default App;
