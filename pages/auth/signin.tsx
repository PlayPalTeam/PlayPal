import Form from '@components/FormComponent';
import FormTitle from '@components/FormTitle';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import useHelper from '@hooks/useHelper';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SignInForm } from 'src/content/contents';

const SignIn = () => {
  const { onSignInSubmit } = useHelper();

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="form-control min-h-screen items-center justify-center w-[80%] mx-auto py-10 sm:py-20">
        <div className="w-full max-w-sm sm:w-3/4">
          <FormTitle title="PlayPal | SignIn" />
          <Form formFields={SignInForm} onSubmit={onSignInSubmit} form={'SignIn'} buttonType={'submit'} buttonText={'Log In'} className="my-5" />
          <div className="mt-5 flex flex-col  items-center space-y-4">
            <Link className="link-hover hover:text-secondary" href="/auth/signup">
              Don&apos;t have an account? Sign Up
            </Link>
            <Link className="link-hover hover:text-secondary" href={'/auth/reset'}>
              Forgot Password
            </Link>
            <Link className="link-hover hover:text-secondary" href={'/moderator/signin'}>
              SignIn As Moderator
            </Link>
          </div>
        </div>
      </div>
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

  return {
    props: {}
  };
};
