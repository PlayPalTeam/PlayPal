import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';

const BlockItem = ({ userData }) => {
  const updateProfileBlock = async (id: string, block: boolean) => {
    const { error } = await supabase.from('profiles').update({ block: !block }).eq('id', id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`User is blocked`);
  };

  const handleBlockButtonClick = () => {
    updateProfileBlock(userData.id, userData.block);
  };

  const blockButtonText = userData.block ? 'Unblock' : 'Block';

  return (
    <div className="flex justify-around border border-slate-600  hover:bg-slate-800">
      <div className="flex-1 p-6 sm:ml-16">{userData.username}</div>
      <div className="flex-1 p-6">{userData.full_name}</div>
      <div className="flex-1 pt-2 ">
        <button onClick={handleBlockButtonClick} className=" hover:bg-red-400 hover:text-black pl-8 p-3 pr-8 rounded-xl bg-slate-800">{blockButtonText}</button>
      </div>
      
    </div>
  );
};

export default BlockItem;
