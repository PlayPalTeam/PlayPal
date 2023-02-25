import Head from 'next/head';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

const Header = dynamic(() => import('@components/LandingHeader'));
const Footer = dynamic(() => import('@components/Footer'));

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>PlayPal</title>
      </Head>
      <main>
        <Header />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
