import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useHelper from '@utils/helper';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback
} from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'] | null;
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

interface UserProfileContextType {
  userProfile: Profile;
  updateUserProfile: (update: ProfileUpdate) => Promise<void>;
  getUserData: () => Promise<void>;
}

const defaultValue: UserProfileContextType = {
  userProfile: null,
  updateUserProfile: () => Promise.resolve(),
  getUserData: () => Promise.resolve()
};

const UserProfileContext = createContext<UserProfileContextType>(defaultValue);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<Profile>(null);
  const { ErrorMessage, SuccessMessage } = useHelper();

  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const getUserData = useCallback(async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      ErrorMessage({ message: "No internet connection, can't fetch data." });
      return;
    }

    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setUserProfile(data);
    } catch (error) {
      ErrorMessage({ message: error.message });
    }
  }, [ErrorMessage, supabase, user?.id]);

  const updateUserProfile = async (update: ProfileUpdate) => {
    try {
      await supabase.from('profiles').update(update).eq('id', user?.id);
      SuccessMessage({
        message: `Updated profile for ${userProfile?.username}`
      });
    } catch (error) {
      ErrorMessage({ message: error.message });
    }
    getUserData();
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, updateUserProfile, getUserData }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
