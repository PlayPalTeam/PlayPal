import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('@/components/Profile'));

const listerprofile = () => {
  return <Profile />;
};

export default listerprofile;
