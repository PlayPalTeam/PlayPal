import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';

const Signin = () => {
  const [email, setEmail] = useState('');

  const { push } = useRouter();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'http://localhost:3000/moderator',
        shouldCreateUser: false
      }
    });

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      push('/moderator');
    }
  }

  return (
    <div className="form-control mx-auto space-y-5 h-screen max-w-md items-center justify-center">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-primary input"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button className="btn-primary btn w-1/2" onClick={signInWithEmail}>
        Sign In
      </button>
    </div>
  );
};

export default Signin;
