import { CallToAction, Footer, Hero, Text } from '@/components/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlayPal'
};

export default function Home() {
  return (
    <>
      <Hero />
      <Text />
      <CallToAction />
      <Footer />
    </>
  );
}
