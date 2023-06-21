import { CallToAction, Footer, Hero, Text } from '@/components/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlayPal'
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Text />
      <CallToAction />
      <Footer />
    </div>
  );
}
