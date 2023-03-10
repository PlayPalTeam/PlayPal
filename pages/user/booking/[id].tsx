import { memo } from 'react';
import { useTurfContext } from '@context/TurfContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const TurfInfo = dynamic(() => import('@components/TurfInfo'));
const BookSlot = dynamic(() => import('@components/BookingSlotDialog'));

const Booking = () => {
  const { query } = useRouter();
  const { id } = query;

  const { allTurfs } = useTurfContext();

  const turf = allTurfs.find((turf) => turf.turf_id === id);

  return (
    <TurfInfo turf={turf}>
      <div className="mb-5">
        <BookSlot {...turf} />
      </div>
    </TurfInfo>
  );
};

export default memo(Booking);
