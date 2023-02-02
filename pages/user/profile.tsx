import ChangePassword from '@components/ChangePassword';
import Layout from '@components/Layout';
import Profile from '@components/Profile';
import { useState } from 'react';

const ListerProfile = () => {
  const [toggle, setToggle] = useState('Account Settings');
  const profilesettings = [
    {
      name: 'Account Settings',
      info: 'Details about your personal information'
    },
    {
      name: 'Password and Security',
      info: 'Details about your personal information'
    }
  ];

  return (
    <Layout title="User Profile">
      <main className="flex justify-between px-10 max-md:mb-5 max-md:flex-col">
        <div className="justify-between max-md:mb-10 max-md:flex">
          {profilesettings.map((data, index) => (
            <button
              key={index}
              onClick={() => setToggle(data.name)}
              className="group flex flex-col rounded-md border border-green-500 p-3 pt-2 transition-colors duration-300 ease-in hover:bg-green-500"
            >
              <p className="transition-colors ease-in group-hover:text-white">
                {data.name}
              </p>
              <p className="text-xs transition-colors ease-in group-hover:text-white">
                {data.info}
              </p>
            </button>
          ))}
        </div>
        <div>
          {toggle === 'Account Settings' && <Profile />}
          {toggle === 'Password and Security' && <ChangePassword />}
        </div>
      </main>
    </Layout>
  );
};

export default ListerProfile;
