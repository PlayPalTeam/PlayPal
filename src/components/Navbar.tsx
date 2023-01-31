import Link from 'next/link';
import { useState } from 'react';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { MdSpaceDashboard } from 'react-icons/md';
import { BiGitPullRequest } from 'react-icons/bi';
import { CgCommunity } from 'react-icons/cg';
import { useUserProfile } from 'src/context/UserProfileContext';

const NavItem = ({ icon, label, href }) => (
  <li className="rounded-md p-3 hover:text-white md:hover:bg-green-800">
    <Link className="flex items-center gap-x-4" href={href}>
      {icon}
      {label}
    </Link>
  </li>
);

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);

  const { userProfile } = useUserProfile();

  const navigations = [
    {
      icon: <MdSpaceDashboard className="h-4 w-4" />,
      label: 'DashBoard',
      href: userProfile?.role === 'lister' ? '/lister' : '/user'
    },
    {
      icon: <BiGitPullRequest className="h-4 w-4" />,
      label: 'Request',
      href: userProfile?.role === 'lister' ? '/lister/request' : '/user/request'
    },
    {
      icon: <BiGitPullRequest className="h-4 w-4" />,
      label: 'Booking',
      href: userProfile?.role === 'lister' ? '/lister/booking' : '/user/booking'
    },
    {
      icon: <CgCommunity className="h-4 w-4" />,
      label: 'Community',
      href:
        userProfile?.role === 'lister' ? '/lister/community' : '/user/community'
    }
  ].filter(
    (nav) => !(nav.label === 'Request' && userProfile?.role === 'lister')
  );

  const toggleNavbar = () => setNavbar(!navbar);

  return (
    <nav className="w-full bg-emerald-400 shadow-sm shadow-black/50 md:sticky md:top-0 md:h-screen md:w-72">
      <div className="mx-auto md:flex md:flex-col md:items-center">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <h2 className="text-2xl font-bold">PlayPal</h2>
            <div className="md:hidden">
              <button
                className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
                onClick={toggleNavbar}
              >
                {navbar ? (
                  <RxCross2 className="h-6 w-6" />
                ) : (
                  <RxHamburgerMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`w-full max-md:mt-5 md:block md:pb-0 ${
            navbar ? 'block' : 'hidden'
          }`}
        >
          <ul className="md:flex md:flex-col">
            {navigations.map((nav, index) => (
              <NavItem key={index} {...nav} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
