import { useUserProfile } from '@context/UserProfileContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '@lib/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SignInType, SignInSchema, EmailInputType, EmailInputSchema } from 'src/types/types';

const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const Button = dynamic(() => import('@components/Button'));

export const SigninModerator = () => {
  const method = useForm<EmailInputType>({ resolver: yupResolver(EmailInputSchema) });
  const { push } = useRouter();

  const signInWithEmail: SubmitHandler<EmailInputType> = async (formData) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formData.email,
      options: {
        emailRedirectTo: 'http://localhost:3000/moderator',
        shouldCreateUser: false
      }
    });

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      await push('/moderator');
    }
  };

  return (
    <section className="flex flex-col space-y-5">
      <FormProvider {...method}>
        <FormInput label="Email" name="email" type="email" placeholder="Enter your email..." />
        <Button type="submit" text="Log In" onClick={method.handleSubmit(signInWithEmail)} disabled={method.formState.isSubmitting} />
      </FormProvider>
    </section>
  );
};

export const SignInUser = () => {
  const methods = useForm<SignInType>({ resolver: yupResolver(SignInSchema) });
  const { userProfile } = useUserProfile();
  const { push } = useRouter();

  const supabase = useSupabaseClient();

  const onSignInSubmit: SubmitHandler<SignInType> = async (data) => {
    const {
      error,
      data: { session }
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) {
      toast.error(error.message);
    }

    if (userProfile?.block) {
      Cookies.remove('supabase-auth-token');
    }

    if (session?.user.user_metadata) {
      await push(`/${session.user.user_metadata.role}`);
    }
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <FormInput name="email" label="Email" placeholder={'Enter your email...'} />
        <FormInput name="password" label="Password" type="password" placeholder={'Enter your password...'} />
        <Button onClick={methods.handleSubmit(onSignInSubmit)} text="Log In" disabled={methods.formState.isSubmitting} type="submit" />
      </FormProvider>
      <div className="flex flex-col space-y-5 border-t-2 pt-4">
        <Link className="btn hover:text-primary" href={'reset'}>
          Forgot Passowrd
        </Link>
        <Link className="btn hover:text-primary" href={'signup'}>
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};
