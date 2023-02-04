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
      <div className="flex flex-wrap gap-10 p-12">
        <div className="grow p-2">
          {profilesettings.map((data, index) => (
            <button
              key={index}
              onClick={() => setToggle(data.name)}
              className="group m-5 flex flex-col rounded-md border border-green-500 p-3 pt-2 transition-colors duration-300 ease-in hover:bg-green-500"
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
      </div>
    </Layout>
  );
};

export default ListerProfile;
