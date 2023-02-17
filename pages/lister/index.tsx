import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';

const TurfCard = dynamic(() => import('@components/TurfCard'));
const BookingCard = dynamic(() => import('@components/BookingCard'));
const CardDisclosure = dynamic(() => import('@components/CardDisclosure'));

const ListerDashBoard = () => {
  const { turfs } = useTurfContext();
  const { books } = useBookContext();

  const BookELement = books.map((book) => <BookingCard key={book.booking_id} {...book} />);
  const TurfELement = turfs.map((turf) => <TurfCard showBookings key={turf.turf_id} {...turf} />);

  return (
    <main className="mx-auto max-w-4xl">
      <CardDisclosure title="Turfs" element={TurfELement} />
      <CardDisclosure title="Bookings" element={BookELement} />
    </main>
  );
};

export default ListerDashBoard;
