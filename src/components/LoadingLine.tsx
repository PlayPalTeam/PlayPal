import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoadingLine = () => {
  const [isloading, setIsloading] = useState(false);
  const { events } = useRouter();

  useEffect(() => {
    const handleStart = () => setIsloading(true);
    const handleStop = () => setIsloading(false);

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleStop);
    events.on('routeChangeError', handleStop);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleStop);
      events.off('routeChangeError', handleStop);
    };
  }, [events]);

  return (
    <progress
      className={`progress progress-primary ${isloading ? 'w-full transition-all duration-500 ease-in-out' : 'hidden'}`}
      value={100}
      max={100}
      style={{ position: 'fixed', top: 0 }}
    ></progress>
  );
};

export default LoadingLine;
