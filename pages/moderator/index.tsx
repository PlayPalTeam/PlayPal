import { useUserProfile } from "@context/UserProfileContext";
import { useState } from "react";



const Index = () => {
    const { allData }=  useUserProfile();
    const [isBlock ,setIsBlock] = useState(false);

    const blockUser =()=>{
       
    }
   
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

            <button onClick={blockUser}>Block</button>
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
            <button onClick={blockUser}>Block</button>
         </div>
        
       ))
     }
        </div>
     </div>



    </div>
  </div>;
};

export default Index;
