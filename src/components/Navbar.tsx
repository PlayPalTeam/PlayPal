import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { BiGitPullRequest } from 'react-icons/bi';
import { CgCommunity } from 'react-icons/cg';
import { AiOutlineProfile } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { supabase } from 'src/lib/supabase';
import Avatar from './Avatar';
import { useUserProfile } from '@context/UserProfileContext';
import useHelper from '@utils/helper';

interface MenuProps {
  children: any;
  button: JSX.Element;
  dropEnd?: boolean;
}

interface MenuItemProps {
  href: string;
  text: string;
  icon?: JSX.Element;
}

const MenuItem = ({ href, text, icon }: MenuItemProps) => {
  const {pathname} = useRouter();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        className={`${
          isActive ? 'text-primary' : ''
        } link-hover link-primary rounded-md hover:no-underline`}
        href={href}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
};

const Menu = ({ children, button, dropEnd }: MenuProps) => {
  return (
    <div className={`dropdown ${dropEnd ? 'dropdown-end' : ''}`}>
      <label tabIndex={0} className="btn-ghost btn">
        {button}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {children}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();

  const { userProfile } = useUserProfile();
  const { getRoleHref } = useHelper();

  const handleSignOut = () => {
    supabase.auth.signOut();
    Cookies.remove('supabase-auth-token');
    router.push('/auth/signin');
  };

  const navigations = [
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
      icon: <CgCommunity className="h-4 w-4" />,
      text: 'Community',
      href: '/community'
    }
  ].filter(
    (nav) => !(nav.text === 'Request' && userProfile?.role === 'lister')
  );

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="lg:hidden">
          <Menu button={<HiOutlineMenuAlt1 className="h-8 w-8" />}>
            {navigations.map((nav) => (
              <MenuItem key={nav.text} {...nav} />
            ))}
          </Menu>
        </div>
        <Link
          className="btn-ghost btn text-xl normal-case"
          href={userProfile?.role === 'lister' ? '/lister' : '/user'}
        >
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
        <Menu
          dropEnd={true}
          button={<Avatar className="w-10 rounded-full" size="40" />}
        >
          <MenuItem
            href={getRoleHref('profile')}
            text="Profile"
            icon={<AiOutlineProfile />}
          />
          <MenuItem
            href={getRoleHref('settings')}
            text="Settings"
            icon={<IoSettingsOutline />}
          />
          <button
            className="btn-ghost btn-sm btn"
            onClick={handleSignOut}
            type="submit"
          >
            Sign Out
          </button>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
