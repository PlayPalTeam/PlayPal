import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('@components/Profile'));

const listerprofile: NextPage = () => {
  return <Profile />;
};

export default listerprofile;
