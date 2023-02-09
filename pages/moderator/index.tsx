import { useUserProfile } from "@context/UserProfileContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "src/lib/supabase";
import { Database } from "src/types/database.types";



type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

const Index = () => {
    const { allData, }=  useUserProfile();
    const [isBlock ,setIsBlock] = useState(true);
    const supabase = useSupabaseClient<Database>();

    const blockUser =(id)=>{
      console.log(id)
     setIsBlock(true)
     const updateProfileBlock = async()=>{
      const {status,error }= await supabase
          .from('profiles')
          .update({'phone_number':45})
          .eq('id',id)
          
          if (error) {
            toast.error(error.message);
          }
          
          if (status === 204) {
            toast.success(`Update done`);
          }
        }

     updateProfileBlock()
    }

    // await supabase
    //       .from('profiles')
    //       .update('block',isBlock)
    //       .eq('username',username)
   
  return <div>
    <div>
        Moderator
    </div>
    <div>
   
     <div>
        Users
        <div >
        {
       allData?.map((data, index)=>(
         data.role==="user" && 
         <div key={index} className="flex justify-around m-4 bg-green-300 text-lg text-black"> 
            <p > {data.username }  </p> 

            <button onClick={ ()=>blockUser(data.id)}>Block</button>
         </div>
        
       ))
     }
        </div>
     </div>

     <div className="mt-32">
        Lister
        <div >
        {
       allData?.map((data, index)=>(
         data.role==="lister" && 
         <div key={index} className="flex justify-around m-4 bg-green-300 text-lg text-black"> 
            <p> {data.username}</p> 
            <button onClick={()=>blockUser(data.id)}>Block</button>
         </div>
        
       ))
     }
        </div>
     </div>



    </div>
  </div>;
};

export default Index;
