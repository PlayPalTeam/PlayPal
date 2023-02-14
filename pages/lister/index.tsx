import TurfCard from '@components/TurfCard';
import { useTurfContext } from '@context/TurfContext';

const ListerDashBoard = () => {
  const { turfs } = useTurfContext();

  return (
    <main>
      {turfs.map((turf) => (
        <TurfCard key={turf.turf_id} {...turf} />
      ))}
    </main>
  );
};

export default ListerDashBoard;
