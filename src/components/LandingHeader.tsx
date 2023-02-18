import useNavBackgroundOnScroll from '@hooks/useNavBackgroundOnScroll';
import Link from 'next/link';
import { IoLogIn } from 'react-icons/io5';

const LandingHeader = () => {
  const applyBackground = useNavBackgroundOnScroll();

  return (
    <header className="relative h-screen">
      <video className="absolute top-0 left-0 -z-50 h-full w-full object-cover brightness-50" autoPlay loop muted>
        <source src="/beach-soccer.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 text-center">
        <nav
          className={`navbar justify-between px-10 max-md:px-5 ${
            applyBackground ? 'bg-gradient-to-b from-transparent to-base-200' : ''
          } sticky top-0`}
        >
          <p className="btn-ghost btn text-xl font-bold md:text-3xl">PlayPal</p>
          <Link href={'/auth/signin'} className="btn-primary btn gap-2">
            <IoLogIn className="h-6 w-6" />
            <span>Sign In</span>
          </Link>
        </nav>
        <div className="mt-48 tracking-widest">
          <h1 className="text-3xl font-bold md:text-7xl">YOUR NEAREST TURF</h1>
          <p className="mt-2 text-lg text-primary">IS JUST A TAP AWAY</p>
          <Link href={'/auth/signin'} className="btn-primary btn mt-5">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
