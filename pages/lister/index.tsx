import Layout from '@components/Layout';
import TurfCard from '@components/TurfCard';
import { useTurfContext } from '@context/TurfContext';

const ListerDashBoard = () => {
  const { turfs } = useTurfContext();

  return (
    <Layout title="Lister">
      <main>
        {turfs.map((turf) => (
          <TurfCard key={turf.turf_id} {...turf} />
        ))}
      </main>
    </Layout>
  );
};

export default ListerDashBoard;
