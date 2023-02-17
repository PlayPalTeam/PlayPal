import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'] | null;
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

interface UserProfileContextType {
  userProfile: Profile;
  allData: Profile[];
  updateUserProfile: (update: ProfileUpdate) => Promise<void>;
}

const defaultValue: UserProfileContextType = {
  userProfile: null,
  allData: null,
  updateUserProfile: () => Promise.resolve()
};

export const UserProfileContext = createContext<UserProfileContextType>(defaultValue);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<Profile>(null);
  const [allData, setAllData] = useState<Profile[]>(null);

  const user = useUser();

  const fetchData = useCallback(async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
      setUserProfile(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [user?.id]);

  const getData = useCallback(async () => {
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setAllData(data);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
      getData();
    }
  }, [user]);

  const updateUserProfile = async (update: ProfileUpdate) => {
    try {
      await supabase.from('profiles').update(update).eq('id', user?.id);
      toast.success(`Updated profile for ${userProfile?.username}`);
    } catch (error) {
      toast.error(error.message);
    }
    fetchData();
  };

  return <UserProfileContext.Provider value={{ userProfile, allData, updateUserProfile }}>{children}</UserProfileContext.Provider>;
};

export const useUserProfile = () => useContext(UserProfileContext);
