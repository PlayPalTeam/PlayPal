import Form from '@components/FormComponent';
import FormTitle from '@components/FormTitle';
import { SignInForm } from '@content/contents';
import useHelper from '@hooks/useHelper';
import { supabase } from '@lib/supabase';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const SignIn = () => {
  const { onSignInSubmit } = useHelper();

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main></main>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
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
