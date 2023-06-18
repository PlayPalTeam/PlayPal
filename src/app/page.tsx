import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Hero from '@/components/LandingPage/Hero/Hero';

export const metadata: Metadata = {
  title: 'PlayPal'
};

export default function Home() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}
