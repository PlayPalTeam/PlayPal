import { ReactNode } from 'react';
import './globals.css';

import ThemeSwitch from '@/components/ThemeChanger';
import { Manrope, Staatliches } from 'next/font/google';
import { Providers } from './providers';

const manrope = Manrope({
  weight: ['700', '500'],
  style: 'normal',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  variable: '--manrope'
});

const staatliches = Staatliches({
  weight: ['400'],
  style: 'normal',
  fallback: ['sans-serif'],
  display: 'auto',
  subsets: ['latin'],
  variable: '--staatliches'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${staatliches.variable}`}>
        <Providers>
          <ThemeSwitch />
          {children}
        </Providers>
      </body>
    </html>
  );
}
