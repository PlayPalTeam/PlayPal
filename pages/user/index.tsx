import CardDisclosure from '@components/CardDisclosure';
import Layout from '@components/Layout';
import { useBookContext } from '@context/BookingContext';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const RequestCard = dynamic(() => import('@components/RequestCard'));
const BookingCard = dynamic(() => import('@components/BookingCard'));

const HomeUser: NextPage = () => {
  const { books } = useBookContext();
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const requestCreateElement = requests
    ?.filter((req) => req.profile_id === userProfile?.id)
    .map((req) => <RequestCard key={req.id} {...req} />);

  const requestAcceptElement = requests
    ?.filter((req) =>
      userProfile?.request?.some((id) => id === req.id.toString())
    )
    .map((req) => <RequestCard key={req.id} {...req} />);

  const bookingElement = books.map((book) => (
    <BookingCard key={book.booking_id} {...book} />
  ));

  return (
    <Layout title="Dashboard">
      <main className="space-y-5 divide-y divide-emerald-200">
        <CardDisclosure title="Bookings" element={bookingElement} />
        <CardDisclosure
          title="Requests you created"
          element={requestCreateElement}
        />
        <CardDisclosure
          title="Requests you accepted"
          element={requestAcceptElement}
        />
      </main>
    </Layout>
  );
};

export default HomeUser;
