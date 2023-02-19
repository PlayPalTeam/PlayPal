import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SignInSchema, SignInType } from '../../src/types/types';
import Cookies from 'js-cookie';
import { useUserProfile } from '@context/UserProfileContext';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const Button = dynamic(() => import('@components/Button'));

const SignIn = () => {
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
      push(`/${session.user.user_metadata.role}`);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main className="form-control mx-auto h-screen w-[80%] max-w-sm justify-center">
        <div className="space-y-5">
          <FormProvider {...methods}>
            <FormTitle title="Sign In" />
            <FormInput name="email" label="Email" placeholder={'Enter your email...'} />
            <FormInput name="password" label="Password" type="password" placeholder={'Enter your password...'} />
            <Button onClick={methods.handleSubmit(onSignInSubmit)} text="Log In" disabled={methods.formState.isSubmitting} type="submit" />
          </FormProvider>
          <div className="flex flex-col space-y-5 border-t-2 pt-4">
            <Link className="btn" href={'reset'}>
              Forgot Passowrd
            </Link>
            <Link className="btn" href={'signup'}>
              Don&apos;t have an account? Sign Up
            </Link>
            <Link className="btn" href={'/moderator/signin'}>
              Sign In As Moderator
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const check = session?.user.user_metadata.role === undefined ? '/moderator' : `/${session?.user.user_metadata.role}`;

  if (session) {
    return {
      redirect: {
        destination: check,
        permanent: false
      }
    };
  }

  return { props: {} };
};
