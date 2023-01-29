import { Popover } from '@headlessui/react';
import { CiLogout } from 'react-icons/ci';
import { AiOutlineProfile } from 'react-icons/ai';
import Link from 'next/link';
import Avatar from './Avatar';
import { useUserProfile } from '@context/UserProfileContext';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { supabase } from 'src/lib/supabase';

const Header = () => {
  const { userProfile } = useUserProfile();

  const router = useRouter();

  const handleSignOut = () => {
    supabase.auth.signOut();
    Cookies.remove('supabase-auth-token');
    router.push('/auth/signin');
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 max-md:p-5">
      <section>
        <input type="search" name="" className='form-input rounded-full focus:ring-1 focus:ring-emerald-400' id="" />
      </section>
      <section>
        <Popover className={'relative'}>
          <Popover.Button
            className={`ring-emerald-300 focus-visible:outline-none ui-open:rounded-full ui-open:ring-2`}
          >
            <Avatar />
          </Popover.Button>
          <Popover.Panel
            className={
              'absolute right-0 z-10 w-max divide-y-2 rounded-md bg-white shadow-md'
            }
          >
            <Link
              href={
                userProfile?.role === 'lister'
                  ? '/lister/profile'
                  : '/user/profile'
              }
              className="flex items-center gap-x-2 px-4 py-2 hover:text-emerald-400"
            >
              <AiOutlineProfile className="h-4 w-4" />
              Profile
            </Link>
            <button
              type="button"
              className="flex items-center gap-x-2 px-4 py-2 hover:text-emerald-400 focus:border-none focus:outline-none"
              onClick={handleSignOut}
            >
              <CiLogout className="h-4 w-4" />
              Sign Out
            </button>
          </Popover.Panel>
        </Popover>
      </section>
    </div>
  );
};

export default Header;
