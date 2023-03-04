import SearchBar from '@components/Search';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ChangeEvent, useState, useMemo } from 'react';

const TurfCard = dynamic(() => import('@components/TurfCard'));

const ListerDashBoard = () => {
  const [query, setQuery] = useState('');
  const { turfs } = useTurfContext();
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    router.push('/lister/turfs');
  };

  const filteredTurfs = useMemo(() => turfs.filter((turf) => turf.turf_name.toLowerCase().includes(query.toLowerCase())), [turfs, query]);

  const TurfElement = filteredTurfs.map((turf) => <TurfCard key={turf.turf_id} turf={turf} />);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="my-8 flex items-center justify-between">
        <SearchBar query={query} handleChange={handleInputChange} className="mr-4 w-[35%]" />
        <button className="btn-primary btn" onClick={handleClick}>Add Turf</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{TurfElement}</div>
    </main>
  );
};

export default ListerDashBoard;
