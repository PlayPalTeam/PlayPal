import { ReactNode } from 'react';
import './globals.css';

import { Manrope, Staatliches } from 'next/font/google';

const manrope = Manrope({
  weight: ['700', "500"],
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
    <html lang="en">
      <body className={`${manrope.variable} ${staatliches.variable}`}>{children}</body>
    </html>
  );
}
