import BookingCard from '@/components/BookingCard';
import { NextPage } from 'next';
import { useBookContext } from '@/context/BookingContext';
import { useRequestContext } from '@/context/RequestContext';
import { useUserProfile } from '@/context/UserProfileContext';
import useHelper from '@/hooks/useHelper';
import CardDisclosure from '@/components/CardDisclosure';

const HomeUser: NextPage = () => {
  const { books } = useBookContext();
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const { dateToString } = useHelper();

  const today = dateToString(new Date());
  // const requestCreateElement = requests
  //   ?.filter(
  //     (req) => req.profiles === userProfile?.id && req.profiles >= today // Filter by user profile ID and game_date being later than current date
  //   )
  //   .map((req) => <RequestCard key={req.id} {...req} />);

  // const requestAcceptElement = requests
  //   ?.filter((req) => userProfile?.request?.includes(req.id.toString()) && req.game_date >= today)
  //   .map((req) => <RequestCard key={req.id} {...req} />);

  const activeBookings = books
    .filter((book) => book.date >= today)
    .map((book) => (
      <div className="" key={book.booking_id}>
        <BookingCard key={book.booking_id} show {...book} />
      </div>
    ));

  const pastBookings = books
    .filter((book) => book.date < today)
    .map((book) => (
      <div key={book.booking_id}>
        <BookingCard key={book.booking_id} {...book} />
      </div>
    ));

  return (
    <main className="mx-auto my-10 w-[90%] max-w-6xl space-y-5">
      <CardDisclosure title=" Active Bookings" element={activeBookings} />
      <CardDisclosure title="Past Bookings" element={pastBookings} />
      {/*<CardDisclosure title="Requests you created" element={requestCreateElement} />*/}
      {/*<CardDisclosure title="Requests you accepted" element={requestAcceptElement} />*/}
    </main>
  );
};

export default HomeUser;
