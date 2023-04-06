import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { AiOutlineProfile } from 'react-icons/ai';
import { supabase } from 'src/lib/supabase';
import { useUserProfile } from '@context/UserProfileContext';
import useHelper from '@hooks/useHelper';
import FilteredNavigation from './navigation';
import Ava from './Ava';
import { Menu, MenuItem } from './Menu';

const Navbar = () => {
  const { push } = useRouter();
  const { userProfile } = useUserProfile();
  const { getRoleHref } = useHelper();

  const navigations = FilteredNavigation(userProfile?.role);

  const handleSignOut = () => {
    supabase.auth.signOut();
    Cookies.remove('supabase-auth-token');
    push('/auth/signin');
  };

  return (
    <nav className="navbar shadow-md md:px-36">
      <div className="navbar-start">
        <div className="lg:hidden">
          <Menu button={<HiOutlineMenuAlt1 className="h-8 w-8" />}>
            {navigations?.map((nav) => (
              <MenuItem key={nav.text} {...nav} />
            ))}
          </Menu>
        </div>
        <Link prefetch={false} className="btn-ghost btn text-xl normal-case" href={getRoleHref('')}>
          PlayPal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-5">
          {navigations?.map((nav) => (
            <MenuItem key={nav.text} {...nav} />
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Menu
          dropEnd={true}
          button={
            <Ava src={userProfile?.avatar_url} className="h-16 w-16 rounded-full object-contain" />
          }
        >
          {userProfile?.role && (
            <>
              <MenuItem href={getRoleHref('profile')} text="Profile" icon={<AiOutlineProfile />} />
            </>
          )}
          <button className="btn-error btn-md btn" onClick={handleSignOut} type="submit">
            Sign Out
          </button>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
