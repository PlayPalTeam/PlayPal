import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { BiGitPullRequest } from 'react-icons/bi';
import { CgCommunity } from 'react-icons/cg';
import { AiOutlineProfile } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { GiTurtleShell } from 'react-icons/gi';
import { supabase } from 'src/lib/supabase';
import Avatar from './Avatar';
import { useUserProfile } from '@context/UserProfileContext';
import useHelper from '@hooks/useHelper';
import { MenuItemProps } from './Menu';
import dynamic from 'next/dynamic';

const Menu = dynamic(() => import('@components/Menu').then((mod) => mod.Menu));
const MenuItem = dynamic(() => import('@components/Menu').then((mod) => mod.MenuItem));

const Navbar = () => {
  const { push } = useRouter();
  const { userProfile } = useUserProfile();
  const { getRoleHref } = useHelper();

  const handleSignOut = () => {
    supabase.auth.signOut();
    Cookies.remove('supabase-auth-token');
    push('/auth/signin');
  };

  const navigations: MenuItemProps[] = [
    {
      icon: <MdSpaceDashboard className="h-4 w-4" />,
      text: 'DashBoard',
      href: getRoleHref('')
    },
    {
      icon: <BiGitPullRequest className="h-4 w-4" />,
      text: 'Request',
      href: getRoleHref('request')
    },
    {
      icon: <BiGitPullRequest className="h-4 w-4" />,
      text: 'Booking',
      href: getRoleHref('booking')
    },
    {
      icon: <GiTurtleShell />,
      text: 'Add Turf',
      href: getRoleHref('turf')
    },
    {
      icon: <CgCommunity className="h-4 w-4" />,
      text: 'Community',
      href: '/community'
    }
  ].filter((nav) => {
    if (!userProfile?.role) return false;
    switch (userProfile?.role) {
      case 'lister':
        return !(nav.text === 'Request' || nav.text === 'Booking');
      case 'user':
        return !(nav.text === 'Add Turf');
      default:
        return false;
    }
  });

  return (
    <nav className="navbar shadow-md md:px-20">
      <div className="navbar-start">
        <div className="lg:hidden">
          <Menu button={<HiOutlineMenuAlt1 className="h-8 w-8" />}>
            {navigations.map((nav) => (
              <MenuItem key={nav.text} {...nav} />
            ))}
          </Menu>
        </div>
        <Link className="btn-ghost btn text-xl normal-case" href={getRoleHref('')}>
          PlayPal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-5">
          {navigations.map((nav) => (
            <MenuItem key={nav.text} {...nav} />
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Menu dropEnd={true} button={<Avatar className="h-12 w-12 rounded-full" size="40" />}>
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
