import Layout from '@components/Layout';
import TurfCard from '@components/TurfCard';
import { useTurfContext } from '@context/TurfContext';

const Lister = () => {
  const { turfs } = useTurfContext();
  return (
    <Layout title="Lister">
      <div className="w-full p-10">
        {turfs.map((turf) => (
          <div key={turf.turf_id}>
            <TurfCard {...turf} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Lister;
