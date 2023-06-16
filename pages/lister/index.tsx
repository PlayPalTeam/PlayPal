import SearchBar from '@/components/Search';
import TurfCard from '@/components/TurfCard';
import { useTurfContext } from '@/context/TurfContext';
import Link from 'next/link';
import { useState, useCallback, ChangeEvent, useMemo } from 'react';

const ListerDashBoard = () => {
  const [query, setQuery] = useState('');
  const { turfs } = useTurfContext();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const filteredTurfs = useMemo(
    () => turfs.filter((turf) => turf.turf_name!.toLowerCase().includes(query.toLowerCase())),
    [turfs, query]
  );

  const TurfElement = useMemo(
    () => filteredTurfs.map((turf) => <TurfCard href="turfs" key={turf?.turf_id} turf={turf} />),
    [filteredTurfs]
  );

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-8 flex items-center justify-between">
          <SearchBar
            placeholder="Search by turf name"
            query={query}
            handleChange={handleInputChange}
            className="mr-4 w-[35%]"
          />
          <Link prefetch={false} href={'/lister/turfs/addTurf'} className="btn-primary btn">
            Add Turf
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 max-md:justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TurfElement}
        </div>
      </main>
    </>
  );
};

export default ListerDashBoard;
