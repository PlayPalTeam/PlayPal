import Layout from '@components/Layout';
import TurfCard from '@components/TurfCard';
import { useTurfContext } from '@context/TurfContext';

const BookingTurf = () => {
  const { turfs } = useTurfContext();
console.log(turfs)
  return (
    <Layout title="Bookings">
      <section className="flex w-full justify-center">
        <div className="sm:w-[70%] sm:space-y-5 ">
          {turfs.map((turf) => (
            <TurfCard key={turf.turf_id} {...turf} book={true} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default BookingTurf;
