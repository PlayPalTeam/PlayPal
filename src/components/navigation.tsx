import { MdSpaceDashboard } from 'react-icons/md';
import { BiGitPullRequest, BiBookAdd } from 'react-icons/bi';
import { CgCommunity } from 'react-icons/cg';
import { GiTurtleShell } from 'react-icons/gi';
import { FcSalesPerformance } from 'react-icons/fc';
import useHelper from '@/hooks/useHelper';
import { useMemo } from 'react';

const icons = {
  dashboard: MdSpaceDashboard,
  request: BiGitPullRequest,
  booking: BiBookAdd,
  addTurf: GiTurtleShell,
  sales: FcSalesPerformance,
  community: CgCommunity
};

const FilteredNavigation = (role: string) => {
  const { getRoleHref } = useHelper();

  const memoizedGetRoleHref = useMemo(() => getRoleHref, [getRoleHref]);

  const navigations = [
    {
      icon: <icons.dashboard className="h-4 w-4" />,
      text: 'DashBoard',
      href: memoizedGetRoleHref('')
    },
    {
      icon: <icons.request className="h-4 w-4" />,
      text: 'Request',
      href: memoizedGetRoleHref('request')
    },
    {
      icon: <icons.booking className="h-4 w-4" />,
      text: 'Booking',
      href: memoizedGetRoleHref('booking')
    }
  ];

  return navigations.filter((nav) => {
    switch (role) {
      case 'lister':
        return !(nav.text === 'Request' || nav.text === 'Booking' || nav.text === 'DashBoard');
      default:
        return true;
    }
  });
};

export default FilteredNavigation;
