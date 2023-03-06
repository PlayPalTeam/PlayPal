import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { useState } from 'react';
import { memo } from 'react';

type ActiveTab = 'user' | 'moderator';

const SignInUser = dynamic(() => import('@components/SignInComponent').then((mod) => mod.SignInUser));
const SignInModerator = dynamic(() => import('@components/SignInComponent').then((mod) => mod.SigninModerator));

const SignIn = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('user');

  const changeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main className="my-28 mx-auto w-[80%] max-w-[22rem]">
        <div>
          <div className="tabs tabs-boxed justify-center gap-x-5">
            <p
              onClick={() => changeTab('user')}
              className={`tab-bordered tab font-normal md:text-base ${activeTab === 'user' ? 'tab-active' : 'text-white'}`}
            >
              Sign In as User
            </p>
            <p
              onClick={() => changeTab('moderator')}
              className={`tab-bordered tab font-normal md:text-base ${activeTab === 'moderator' ? 'tab-active' : 'text-white'}`}
            >
              Sign In as Moderator
            </p>
          </div>
          <div className="mt-5">{activeTab === 'user' ? <SignInUser /> : <SignInModerator />}</div>
        </div>
      </main>
    </>
  );
};

export default memo(SignIn);

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
