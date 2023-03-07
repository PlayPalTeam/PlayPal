import { useUserProfile } from '@context/UserProfileContext';
import { memo } from 'react';
import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';

const BlockItem = ({ userData }) => {
  const { getData } = useUserProfile();

  const updateProfileBlock = async (id: string, block: boolean) => {
    const { error } = await supabase.from('profiles').update({ block: !block }).eq('id', id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (block) {
      toast.success(`User is unblocked`);
    } else {
      toast.success(`User is blocked`);
    }

    getData();
  };

  const handleBlockButtonClick = () => {
    updateProfileBlock(userData.id, userData.block);
  };

  const blockButtonText = userData.block ? 'Unblock' : 'Block';

  return (
    <div className="mb-4 mt-4 flex justify-around  rounded-lg border border-info text-xs font-bold tracking-wide hover:bg-slate-800 sm:text-lg sm:tracking-wide">
      <div className="flex flex-1 justify-center p-5 sm:p-6">{userData.username}</div>
      <div className="flex flex-1 justify-center p-5 sm:p-6">{userData.full_name}</div>
      <div className="flex  flex-1 justify-center p-3 sm:p-4">
        <button
          onClick={handleBlockButtonClick}
          className=" sm:text-md rounded-xl bg-slate-800 p-3 pl-5 pr-5 hover:bg-red-500 hover:text-white sm:pl-6 sm:pr-6 sm:font-thin"
        >
          {blockButtonText}
        </button>
      </div>
    </div>
  );
};

export default memo(BlockItem);
