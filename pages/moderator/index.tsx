import Layout from '@components/Layout';
import { useUserProfile } from '@context/UserProfileContext';
import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';

const Index = () => {
  const { allData } = useUserProfile();

  const updateProfileBlock = async (id: string, block: boolean) => {
    const { status, error } = await supabase.from('profiles').update({ block: !block }).eq('id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Update done`);
    }
  };

  return (
    <Layout title="Moderator">
      <div>
        <div className="">
          <div className="m-6 mb-6 flex justify-center text-2xl font-bold tracking-widest">Users</div>
          <div className="  ">
            <div className='bg-red-400 max-w-[1000px]'>
              {allData?.map(
                (data, index) =>
                  data.role === 'user' && (
                    <div key={index} className="m-4 flex justify-around bg-green-300 text-lg text-black">
                      <p> {data.username} </p>

                      <button onClick={() => updateProfileBlock(data.id, data.block)}>{data.block ? 'Unblock' : 'Block'}</button>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="mt-32">
          Lister
          <div>
            {allData?.map(
              (data, index) =>
                data.role === 'lister' && (
                  <div key={index} className="m-4 flex justify-around bg-green-300 text-lg text-black">
                    <p> {data.username}</p>
                    <button onClick={() => updateProfileBlock(data.id, data.block)}>{data.block ? 'Unblock' : 'Block'}</button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
