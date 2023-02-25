import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';

const TurfCard = dynamic(() => import('@components/TurfCard'));
const CardDisclosure = dynamic(() => import('@components/CardDisclosure'));

const ListerDashBoard = () => {
  const { turfs } = useTurfContext();
  const TurfELement = turfs.map((turf) => <TurfCard showBookings key={turf.turf_id} {...turf} />);

  return (
    <main className="mx-auto max-w-4xl">
      <CardDisclosure title="Turfs" element={TurfELement} />
    </main>
  );
};

export default ListerDashBoard;
