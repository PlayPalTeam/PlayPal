import { useState } from 'react';
import Layout from '@components/Layout';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const RequestForm = dynamic(() => import('@components/RequestForm'), { ssr: false });
const RequestCard = dynamic(() => import('@components/RequestCard'), { ssr: false });

const Request: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  const filteredRequests = requests?.filter(
    (req) => req.profile_id !== userProfile?.id && !userProfile?.request?.includes(req.id.toString()) && req?.player_needed > 0
  );

  return (
    <main className="flex flex-col items-center space-y-5">
      <section className="text-right">
        <button className="btn-primary btn" onClick={() => setIsOpen(true)}>
          Create Requests
        </button>
      </section>
      <RequestForm isOpen={isOpen} setIsOpen={setIsOpen} />
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
