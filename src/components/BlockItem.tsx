

import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';


const BlockItem = ({userData}) => {

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
        <div className="m-4 flex justify-around bg-green-300 text-lg text-black">
          <p> {userData.username} </p>
          <p> {userData.full_name}</p>
         

          <button onClick={() => updateProfileBlock(userData.id, userData.block)}>{userData.block ? 'Unblock' : 'Block'}</button>
        </div>
      </div>
    </>
  );
};

export default BlockItem;
