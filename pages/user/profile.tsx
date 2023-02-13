import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('@components/Profile'));

const userprofile: NextPage = () => {
  return <Profile />;
};

export default userprofile;
