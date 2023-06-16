import Link from 'next/link';
import { IoLogIn } from 'react-icons/io5';

const LandingHeader = () => {
  return (
    <header className="relative h-screen">
      <video
        className="absolute left-0 top-0 -z-50 h-full  w-full object-cover brightness-50"
        autoPlay
        loop
        muted
      >
        <source src="/beach-soccer.webm" type="video/webm" />
      </video>
      <div className="relative z-10 text-center">
        <nav className={`navbar justify-between px-10 max-md:px-5`}>
          <p className="btn-ghost btn text-xl font-bold md:text-3xl">PlayPal</p>
        </nav>
        <div className="mt-48 tracking-widest">
          <h1 className="text-3xl font-bold md:text-7xl">YOUR NEAREST TURF</h1>
          <p className="mt-2 text-lg text-primary">IS JUST A TAP AWAY</p>
          <Link prefetch={false} href={'/auth/login'} className="btn-primary btn mt-5">
            <IoLogIn className="h-6 w-6" />
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
