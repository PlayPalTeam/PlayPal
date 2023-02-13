import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';

const TurfCard = dynamic(() => import('@components/TurfCard'), { ssr: false });

const BookingTurf = () => {
  const { turfs } = useTurfContext();
  return (
    <section className="flex w-full justify-center">
      <div className="sm:w-[70%] sm:space-y-5 ">
        {turfs.map((turf) => (
          <TurfCard key={turf.turf_id} {...turf} book={true} />
        ))}
      </div>
    </section>
  );
};

export default BookingTurf;
