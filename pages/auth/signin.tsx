import { SignInUser, SigninModerator } from '@/components/SignInComponent';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { type GetServerSideProps, type GetServerSidePropsContext } from 'next/types';
import { useState } from 'react';

type ActiveTab = 'user' | 'moderator';

const SignIn = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('user');

  const changeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <main className="mx-auto my-28 w-[80%] max-w-[22rem]">
        <div>
          <div className="tabs tabs-boxed justify-center gap-x-5">
            <p
              onClick={() => changeTab('user')}
              className={`tab-bordered tab font-normal md:text-base ${
                activeTab === 'user' ? 'tab-active' : 'text-white'
              }`}
            >
              Sign In as User
            </p>
            <p
              onClick={() => changeTab('moderator')}
              className={`tab-bordered tab font-normal md:text-base ${
                activeTab === 'moderator' ? 'tab-active' : 'text-white'
              }`}
            >
              Sign In as Moderator
            </p>
          </div>
          <div className="mt-5">{activeTab === 'user' ? <SignInUser /> : <SigninModerator />}</div>
        </div>
      </main>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const check =
    session?.user.user_metadata.role === undefined
      ? '/moderator'
      : `/${session?.user.user_metadata.role}`;

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
