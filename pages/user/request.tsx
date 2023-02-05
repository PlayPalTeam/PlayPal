import { useState } from 'react';
import Layout from '@components/Layout';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const RequestForm = dynamic(() => import('@components/RequestForm'));
const RequestCard = dynamic(() => import('@components/RequestCard'));

const Request: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { requests, getRequestsData } = useRequestContext();
  const { userProfile } = useUserProfile();

  getRequestsData();

  const filteredRequests = requests?.filter(
    (req) => !userProfile.request?.includes(req.id.toString())
  );

  return (
    <Layout title="Requests">
      <main className="flex w-full justify-center">
        <section>
          <div className="text-right">
            <button
              className="rounded-lg bg-green-400 px-4 py-2 text-white hover:bg-green-500 active:bg-green-600"
              onClick={() => setIsOpen(true)}
            >
              Create Requests
            </button>
          </div>
          <RequestForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>

        <section className="space-y-5">
          {filteredRequests?.map((req) => (
            <RequestCard key={req.id} {...req} />
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default Request;
