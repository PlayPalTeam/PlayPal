import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';

const TurfCard = dynamic(() => import('@components/TurfCard'));
const BookingCard = dynamic(() => import('@components/BookingCard'));

const ListerDashBoard = () => {
  const { turfs } = useTurfContext();
  const { books } = useBookContext();

  return (
    <main>
      {turfs.map((turf) => (
        <TurfCard key={turf.turf_id} showBookings {...turf} />
      ))}
      {books.map((book) => (
        <BookingCard key={book.booking_id} {...book} />
      ))}
    </main>
  );
};

export default ListerDashBoard;
