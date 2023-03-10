import { useBookContext } from '@context/BookingContext';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import useHelper from '@hooks/useHelper';

const RequestCard = dynamic(() => import('@components/RequestCard'));
const BookingCard = dynamic(() => import('@components/BookingCard'));
const CardDisclosure = dynamic(() => import('@components/CardDisclosure'));

const HomeUser: NextPage = () => {
  const { books } = useBookContext();
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const { dateToString } = useHelper();

  const today = dateToString(new Date());
  const requestCreateElement = requests
    ?.filter(
      (req) => req.profile_id === userProfile?.id && req.game_date >= today // Filter by user profile ID and game_date being later than current date
    )
    .map((req) => <RequestCard key={req.id} {...req} />);

  const requestAcceptElement = requests
    ?.filter((req) => userProfile?.request?.includes(req.id.toString()))
    .map((req) => <RequestCard key={req.id} {...req} />);

  const activeBookings = books.filter((book) => book.date >= today).map((book) => <BookingCard key={book.booking_id} show {...book} />);
  const pastBookings = books.filter((book) => book.date < today).map((book) => <BookingCard key={book.booking_id} {...book} />);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="mx-auto my-10 w-[90%] max-w-6xl space-y-5">
        <CardDisclosure title=" Active Bookings" element={activeBookings} />
        <CardDisclosure title="Past Bookings" element={pastBookings} />
        <CardDisclosure title="Requests you created" element={requestCreateElement} />
        <CardDisclosure title="Requests you accepted" element={requestAcceptElement} />
      </main>
    </>
  );
};

export default HomeUser;
