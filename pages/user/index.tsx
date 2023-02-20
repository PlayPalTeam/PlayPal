import { useBookContext } from '@context/BookingContext';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const RequestCard = dynamic(() => import('@components/RequestCard'), { ssr: false });
const BookingCard = dynamic(() => import('@components/BookingCard'), { ssr: false });
const CardDisclosure = dynamic(() => import('@components/CardDisclosure'), { ssr: false });

const HomeUser: NextPage = () => {
  const { books } = useBookContext();
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const requestCreateElement = requests?.filter((req) => req.profile_id === userProfile?.id).map((req) => <RequestCard key={req.id} {...req} />);

  const requestAcceptElement = requests
    ?.filter((req) => userProfile?.request?.includes(req.id.toString()))
    .map((req) => <RequestCard key={req.id} {...req} />);

  const bookingElement = books.map((book) => <BookingCard key={book.booking_id} {...book} />);

  return (
    <main className="mx-auto w-[90%] my-10 max-w-5xl space-y-5">
      <CardDisclosure title="Bookings" element={bookingElement} />
      <CardDisclosure title="Requests you created" element={requestCreateElement} />
      <CardDisclosure title="Requests you accepted" element={requestAcceptElement} />
    </main>
  );
};

export default HomeUser;
