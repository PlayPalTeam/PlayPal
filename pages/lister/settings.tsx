import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Password = dynamic(() => import('@components/ChangePassword'), { ssr: false });

const Settings: NextPage = () => {
  const [activeTab, setActiveTab] = useState('Change Password');

  return (
    <main className="h-full w-full bg-red-500">
      <div className="bg-black">
        <section className="tabs tabs-boxed">
          <p className={`tab ${activeTab === 'Change Password' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Change Password')}>
            Change Password
          </p>
          <p className={`tab ${activeTab === 'Themes' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Themes')}>
            Themes
          </p>
        </section>
        <section>{activeTab === 'Change Password' && <Password />}</section>
      </div>
    </main>
  );
};

export default Settings;
