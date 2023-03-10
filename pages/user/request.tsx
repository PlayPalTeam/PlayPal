import { RequestResponse } from '@components/RequestCard';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ChangeEvent, useCallback, useState } from 'react';

const RequestForm = dynamic(() => import('@components/RequestForm'));
const RequestCard = dynamic(() => import('@components/RequestCard'));
const Search = dynamic(() => import('@components/Search'));

const Request: NextPage = () => {
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();
  const currentDate = new Date();
  const [query, setQuery] = useState('');

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const isRequestValid = (req: RequestResponse) =>
    req.profile_id !== userProfile?.id &&
    !userProfile?.request?.includes(req.id.toString()) &&
    req?.player_needed > 0 &&
    new Date(req.game_date) >= currentDate;

  const isTitleMatch = (req: RequestResponse) =>
    Array.isArray(req.turfs)
      ? req.turfs.some((turf) => turf.turf_name.toLowerCase().includes(query.toLowerCase()))
      : req.turfs.turf_name.toLowerCase().includes(query.toLowerCase());

  const filteredRequests = requests?.filter((req) => isRequestValid(req) && isTitleMatch(req));

  return (
    <>
      <Head>
        <title>Request</title>
      </Head>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-5 flex items-center justify-between">
          <Search placeholder="Search by turf name" query={query} handleChange={handleInputChange} />
          <RequestForm />
        </div>
        {filteredRequests && (
          <section className="space-y-5">
            {filteredRequests.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))}
          </section>
        )}
      </main>
    </>
  );
};

export default Request;
