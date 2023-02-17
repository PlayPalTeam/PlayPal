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
    <div className="border border-slate-600 p-4">
      <div className="flex justify-around">
        <div className="flex-1">{userData.username}</div>
        <div className="flex-1">{userData.full_name}</div>
        <div className="flex-1">
          <button onClick={handleBlockButtonClick}>{blockButtonText}</button>
        </div>
      </div>
    </div>
  );
};

export default BlockItem;
