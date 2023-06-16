import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default function Login() {
  const handleSignUp = async (formData: FormData) => {
    'use server';
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:300/auth/callback'
      }
    });
    revalidatePath('/');
  };

  const handleSignIn = async (formData: FormData) => {
    'use server';
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signInWithPassword({
      email,
      password
    });

    revalidatePath('/');
  };

  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    revalidatePath('/');
  };

  return (
    <form action={handleSignUp}>
      <input type="text" name="email" id="email" />
      <input type="password" name="password" id="password" />
      <button>Sign Up</button>
      <button formAction={handleSignIn}>Sign In</button>
      <button formAction={handleSignOut}>Sign Out</button>
    </form>
  );
}
