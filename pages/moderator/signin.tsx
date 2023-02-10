import { useState } from "react";
import { supabase } from 'src/lib/supabase';

const Signin = () => {

    const [email, setEmail] = useState("");
    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithOtp({
          email:email,
          options: {
            emailRedirectTo: 'http://localhost:3000/moderator'
          }
        });
      }
      
  return (
    <div>
           <div>
        <input type="email"  name="email" placeholder='Email' value={email} onChange={ (e)=>{setEmail(e.target.value)}}/>
        <button onClick={signInWithEmail}>Sign In</button>
      </div>

    </div>
  )
}

export default Signin