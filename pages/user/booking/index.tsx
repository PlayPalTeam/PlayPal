import { useTurfContext } from '@/context/TurfContext';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ChangeEvent, useState, useMemo, useCallback } from 'react';

const TurfCard = dynamic(() => import('@/components/TurfCard'));
const SearchBar = dynamic(() => import('@/components/Search'));

const BookingTurf = () => {
  const [query, setQuery] = useState('');
  const { allTurfs: turfs } = useTurfContext();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const filteredTurfs = useMemo(() => turfs.filter((turf) => turf.turf_name!.toLowerCase().includes(query.toLowerCase())), [turfs, query]);

  const TurfElement = useMemo(() => filteredTurfs.map((turf) => <TurfCard href="booking" key={turf?.turf_id} turf={turf} />), [filteredTurfs]);

  return (
    <>
      <Head>
        <title>Booking</title>
      </Head>
      <section className="mx-auto mt-5 max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
        <SearchBar placeholder='Search by name..' query={query} handleChange={handleInputChange} className="mr-4 w-[35%]" />
        <div className="grid grid-cols-1 gap-8 max-md:justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{TurfElement}</div>
      </section>
    </>
  );
};

export default BookingTurf;
