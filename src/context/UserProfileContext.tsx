import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';
import { useDeepCompareEffect } from 'react-use';

type Profile = Database['public']['Tables']['profiles']['Row'] | null;
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

interface UserProfileContextType {
  userProfile: Profile;
  updateUserProfile: (update: ProfileUpdate) => Promise<void>;
}

const defaultValue: UserProfileContextType = {
  userProfile: null,
  updateUserProfile: () => Promise.resolve()
};

export const UserProfileContext =
  createContext<UserProfileContextType>(defaultValue);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [userProfile, setUserProfile] = useState<Profile>(null);

  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return;
    }
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [supabase, user]);

  const updateUserProfile = async (update: ProfileUpdate) => {
    try {
      await supabase.from('profiles').update(update).eq('id', user?.id);
      toast.success(`Updated profile for ${userProfile?.username}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
