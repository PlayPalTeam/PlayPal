import { useUserProfile } from '@context/UserProfileContext';
import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';



const BlockItem = ({ userData }) => {

  const {getData} = useUserProfile()

  const updateProfileBlock = async (id: string, block: boolean) => {
    const { error } = await supabase.from('profiles').update({ block: !block }).eq('id', id);

    if (error) {
      toast.error(error.message);
      return;
    }

    if(block){
      toast.success(`User is unblocked`);
    }else{
      toast.success(`User is blocked`);
    }
     
    
  

    getData()
  };

  const handleBlockButtonClick = () => {
    updateProfileBlock(userData.id, userData.block);
  };

  const blockButtonText = userData.block ? 'Unblock' : 'Block';

  return (
    <div className="flex justify-around border border-info  rounded-lg hover:bg-slate-800 sm:text-lg sm:tracking-wide mb-4 mt-4 text-xs font-bold tracking-wide">
      <div className="flex-1 justify-center flex sm:p-6 p-5">{userData.username}</div>
      <div className="flex-1 flex justify-center sm:p-6 p-5">{userData.full_name}</div>
      <div className="flex-1  flex justify-center sm:p-4 p-3">
        <button onClick={handleBlockButtonClick} className=" sm:font-thin rounded-xl sm:text-md bg-slate-800 sm:pl-6 sm:pr-6 pl-5 pr-5 p-3 hover:bg-red-500 hover:text-white">
          {blockButtonText}
        </button>
      </div>
    </div>
  );
};

export default BlockItem;
