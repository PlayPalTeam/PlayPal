import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo } from 'react';

const BookingCard = dynamic(() => import('@components/BookingCard'));
const TurfInfo = dynamic(() => import('@components/TurfInfo'));

const Turf = () => {
  const { query } = useRouter();
  const { id } = query;
  const { turfs } = useTurfContext();
  const { listerbooks } = useBookContext();

  const turf = turfs.find((c) => c.turf_id === id);
  const books = listerbooks.filter((c) => c.turf_id === id);

  const BookingCards = books.map((book) => <BookingCard key={book.booking_id} {...book} />);

  return (
    <TurfInfo turf={turf}>
      <section>
        <h2>Bookings</h2>
        <div className="mt-5 space-y-5">{BookingCards}</div>
      </section>
    </TurfInfo>
  );
};

export default memo(Turf);
