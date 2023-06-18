import type { Metadata } from 'next';
import Hero from '@/components/LandingPage/Hero';
import Text from '@/components/LandingPage/Text';
import Gallery from '@/components/LandingPage/Gallery';

export const metadata: Metadata = {
  title: 'PlayPal'
};

export default function Home() {
  return (
    <>
      <Hero />
      <Text />
      <Gallery />
    </>
  );
}
