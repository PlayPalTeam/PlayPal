import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo } from 'react';

const Avatar = dynamic(() => import('@components/Ava'));
const BookingCard = dynamic(() => import('@components/BookingCard'));
const DeletButton = dynamic(() => import('@components/Delete'));

const Turf = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const { turfs, deleteTurf } = useTurfContext();
  const { listerbooks } = useBookContext();

  const turf = turfs.find((c) => c.turf_id === id);
  const books = listerbooks.filter((c) => c.turf_id === id);

  const BookingCards = books.map((book) => <BookingCard key={book.booking_id} {...book} />);

  const DeleteTurf = async () => {
    await deleteTurf(turf?.turf_id);
    push('/lister');
  };

  return (
    <>
      <Head>
        <title>{turf?.turf_name}</title>
      </Head>
      <main className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
        <section>
          <Avatar className="mx-auto mb-8 h-auto w-full rounded-2xl" src={turf?.turf_image} />
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-3xl font-bold">{turf?.turf_name}</h2>
            <DeletButton
              title="Confirm Turf Deletion"
              description="Are you sure you want to delete this turf? This action cannot be undone. All data associated with this turf will be permanently removed from the system."
              onClick={DeleteTurf}
            />
          </div>
          <p className="mb-4 text-lg">{turf?.description}</p>
          <div className="mb-4 flex flex-wrap">
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Address:</span> {turf?.address}
            </p>
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Open Hours:</span> {turf?.open_hour} - {turf?.close_hour}
            </p>
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Price:</span> {turf?.price} <span>&#8377;</span>
            </p>
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Capacity:</span> {turf?.capacity}
            </p>
          </div>
          <div className="mb-8 flex flex-wrap">
            <div className="w-full md:w-1/2">
              <p className="mb-2 font-bold">Amenities:</p>
              <ul className="list-inside list-disc">
                {turf?.amenities?.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mb-2 font-bold">Sports:</p>
              <ul className="list-inside list-disc">
                {turf?.sports?.map((sport) => (
                  <li key={sport}>{sport}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h2>Bookings</h2>
          <div className="mt-5 space-y-5">{BookingCards}</div>
        </section>
      </main>
    </>
  );
};

export default memo(Turf);
