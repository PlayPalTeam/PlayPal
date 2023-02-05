import { useUserProfile } from '@context/UserProfileContext';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  SignInData,
  SignUpData,
  ResetData,
  ForgotPasswordData
} from '../types/types';

const useHelper = () => {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const supabase = useSupabaseClient();

  const ErrorMessage = ({ message }: { message: string }) => {
    return toast.error(message);
  };

  const SuccessMessage = ({ message }: { message: string }) => {
    return toast.success(message);
  };

  const onSignUpSubmit: SubmitHandler<SignUpData> = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          role: data.role
        },
        emailRedirectTo: 'http://localhost:3000/auth/signin'
      }
    });

    if (error) {
      ErrorMessage({ message: error.message });
    } else {
      SuccessMessage({ message: 'Check your email' });
    }
  };

  const onSignInSubmit: SubmitHandler<SignInData> = async (data) => {
    const {
      error,
      data: { session }
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) {
      ErrorMessage({ message: error.message });
    }

    if (session?.user.user_metadata) {
      router.push(`/${session.user.user_metadata.role}`);
    }
  };

  const onResetSubmit: SubmitHandler<ResetData> = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.email, {
      redirectTo: 'http://localhost:3000/auth/forgot'
    });

    if (error) {
      ErrorMessage({ message: error.message });
    }

    SuccessMessage({ message: 'Check your email' });
  };

  const onPasswordSubmit: SubmitHandler<ForgotPasswordData> = async ({
    password,
    confirmPassword
  }) => {
    if (password !== confirmPassword) {
      ErrorMessage({ message: 'Passwords must match' });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      ErrorMessage({ message: error.message });
    }

    SuccessMessage({ message: 'Password reset successful!' });
    router.push('/auth/signin');
  };

  const getRoleHref = (route: string) =>
    userProfile?.role === 'lister' ? `/lister/${route}` : `/user/${route}`;

  return {
    onSignUpSubmit,
    onSignInSubmit,
    onResetSubmit,
    onPasswordSubmit,
    getRoleHref,
    ErrorMessage,
    SuccessMessage
  };
};

export default useHelper;
