import Footer from '@/components/Footer';
import LandingHeader from '@/components/LandingHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlayPal'
};

export default function Home() {
  return (
    <>
      <LandingHeader />
      <Footer />
    </>
  );
}
