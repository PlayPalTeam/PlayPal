import Layout from '@components/Layout';
import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const RequestForm = dynamic(() => import('@components/RequestForm'));
const RequestCard = dynamic(() => import('@components/RequestCard'));

const Request: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { requests } = useRequestContext();
  const { userProfile } = useUserProfile();

  return (
    <Layout title="Requests">
      <main className="w-full px-10">
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
        <hr className="my-5 border-black" />
        <section className="space-y-5">
          {requests
            ?.filter(
              (req) => !userProfile?.request.includes(req?.id.toString())
            )
            .map((req) => (
              <RequestCard key={req.id} {...req} />
            ))}
        </section>
      </main>
    </Layout>
  );
};

export default Request;
