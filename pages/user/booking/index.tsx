import Layout from '@components/Layout';
import TurfCard from '@components/TurfCard';
import { useTurfContext } from '@context/TurfContext';

const BookingTurf = () => {
  const { turfs } = useTurfContext();

  return (
    <Layout title="Bookings">
      <section className="w-full flex justify-center">
        <div className="  sm:w-[65%] sm:space-y-5 ">
          {turfs.map((turf) => (
            <div key={turf.turf_id}>
              <TurfCard {...turf} book={true} />
            </div>
          ))}
        </div>
        
      </section>
    </Layout>
  );
};

export default BookingTurf;
