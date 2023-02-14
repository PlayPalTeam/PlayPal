import dynamic from 'next/dynamic';
import { useTurfContext } from '@context/TurfContext';

const TurfCard = dynamic(() => import('@components/TurfCard'));

const ListerDashBoard = () => {
  const { turfs } = useTurfContext();

  return (
    <main>
      {turfs.map((turf) => (
        <TurfCard key={turf.turf_id} showBookings {...turf} />
      ))}
    </main>
  );
};

export default ListerDashBoard;
