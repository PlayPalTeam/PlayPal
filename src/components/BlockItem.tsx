import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';

const BlockItem = ({ userData }) => {
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
    <>
      <div>
        <div className=" flex justify-around hover:scale-110 border border-slate-600 p-4 transition-all delay-300 ease-in-out   ">
          <div className='flex-1 '>{userData.username}</div>
          <div className='flex-1'>{userData.full_name}</div>
          <div className='flex-1'>
            <button onClick={() => updateProfileBlock(userData.id, userData.block)}>{userData.block ? 'Unblock' : 'Block'}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockItem;
