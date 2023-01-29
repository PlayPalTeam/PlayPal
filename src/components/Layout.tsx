import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';
import Navbar from './Navbar';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const message = `PlayPal | ${title}`;
  return (
    <>
      <Head>
        <title>{message}</title>
      </Head>
      <div className="md:flex">
        <Navbar />
        <div className="w-full bg-gray-100">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
