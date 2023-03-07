import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, useState, useMemo, useCallback } from 'react';

const TurfCard = dynamic(() => import('@components/TurfCard'));
const SearchBar = dynamic(() => import('@components/Search'));

const ListerDashBoard = () => {
  const [query, setQuery] = useState('');
  const { turfs } = useTurfContext();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const filteredTurfs = useMemo(() => turfs.filter((turf) => turf.turf_name.toLowerCase().includes(query.toLowerCase())), [turfs, query]);

  const TurfElement = useMemo(() => filteredTurfs.map((turf) => <TurfCard href="turfs" key={turf?.turf_id} turf={turf} />), [filteredTurfs]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-8 flex items-center justify-between">
          <SearchBar query={query} handleChange={handleInputChange} className="mr-4 w-[35%]" />
          <Link href={'/lister/turfs/addTurf'} className="btn-primary btn">
            Add Turf
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 max-md:justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{TurfElement}</div>
      </main>
    </>
  );
};

export default ListerDashBoard;
