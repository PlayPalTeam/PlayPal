import { useRequestContext } from '@/context/RequestContext';
import { useUserProfile } from '@/context/UserProfileContext';
import useHelper from '@/hooks/useHelper';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ChangeEvent, useCallback, useState } from 'react';

const RequestForm = dynamic(() => import('@/components/RequestForm'));
const RequestCard = dynamic(() => import('@/components/RequestCard'));
const Search = dynamic(() => import('@/components/Search'));

const Request: NextPage = () => {
  const [query, setQuery] = useState('');
  const { dateToString } = useHelper();
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

//  const filteredRequests = requests.filter((request) => {
//    return (
//      request.profile_id !== userProfile.id &&
//      !userProfile.request?.includes(request.id.toString()) &&
//      request.game_date >= dateToString(new Date()) &&
//      (query.length === 0 ||
//        (Array.isArray(request.turfs)
//          ? request.turfs.some((turf) => turf.turf_name.toLowerCase().includes(query.toLowerCase()))
//          : request.turfs.turf_name.toLowerCase().includes(query.toLowerCase())))
//    );
//  });

  return (
    <>
      <Head>
        <title>Request</title>
      </Head>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-5 flex items-center justify-between">
          <Search
            placeholder="Search by turf name"
            query={query}
            handleChange={handleInputChange}
          />
          <RequestForm />
        </div>
        {/*<section className="space-y-5">*/}
        {/*  {filteredRequests.length > 0 ? (*/}
        {/*    filteredRequests.map((req) => <RequestCard key={req.id} {...req} />)*/}
        {/*  ) : (*/}
        {/*    <p className="text-center">No Request Available</p>*/}
        {/*  )}*/}
        {/*</section>*/}
      </main>
    </>
  );
};

export default Request;
