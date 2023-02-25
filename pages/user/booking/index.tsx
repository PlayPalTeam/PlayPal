import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';

const TurfCard = dynamic(() => import('@components/TurfCard'));

const BookingTurf = () => {
  const { allTurfs } = useTurfContext();
  return (
    <section className="flex w-full justify-center">
      <div className="sm:w-[70%] sm:space-y-5 ">
        {allTurfs.map((turf) => (
          <TurfCard key={turf.turf_id} {...turf} book={true} />
        ))}
      </div>
    </section>
  );
};

export default BookingTurf;
