import { useState } from 'react';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const RequestForm = dynamic(() => import('@components/RequestForm'));
const RequestCard = dynamic(() => import('@components/RequestCard'));

const Request: NextPage = () => {
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const filteredRequests = requests?.filter(
    (req) => req.profile_id !== userProfile?.id && !userProfile?.request?.includes(req.id.toString()) && req?.player_needed > 0
  );

  return (
    <main className="flex flex-col items-center space-y-5">
      <RequestForm />
      {filteredRequests && (
        <section className="space-y-5">
          {filteredRequests.map((req) => (
            <RequestCard key={req.id} {...req} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Request;
