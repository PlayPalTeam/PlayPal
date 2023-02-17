import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';
import { useUserProfile } from './UserProfileContext';

type Turf = Database['public']['Tables']['turfs']['Row'];
type TurfInsert = Database['public']['Tables']['turfs']['Insert'];
type TurfUpdate = Database['public']['Tables']['turfs']['Update'];

interface TurfContextType {
  turfs: Turf[];
  addTurf: (turf: TurfInsert) => Promise<void>;
  updateTurf: (id: string, update: TurfUpdate) => Promise<void>;
  deleteTurf: (id: string) => Promise<void>;
}

export const TurfContext = createContext<TurfContextType>({
  turfs: [],
  addTurf: () => Promise.resolve(),
  updateTurf: () => Promise.resolve(),
  deleteTurf: () => Promise.resolve()
});

export const TurfProvider = ({ children }: { children: ReactNode }) => {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const { userProfile } = useUserProfile();

  const user = useUser();

  const fetchTurfs = useCallback(async (ownerId:string) => {
    const { data, error } = await supabase.from('turfs').select('*').eq('owner', ownerId);

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setTurfs(data);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (userProfile?.role === 'user') {
        fetchTurfs(null);
      } else if (userProfile?.role === 'lister') {
        fetchTurfs(user?.id);
      }
    }
  }, [user]);

  const addTurf = async (turf: TurfInsert) => {
    const { status, error } = await supabase.from('turfs').insert({ ...turf, owner: user?.id });

    if (error) {
      toast.error(error.message);
    }

    if (status === 201) {
      toast.success(`Insert for ${turf.turf_name}`);
    }
  };

  const updateTurf = async (id: string, update: TurfUpdate) => {
    const { status, error } = await supabase.from('turfs').update(update).eq('id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Update done for ${update.turf_name}`);
    }
  };

  const deleteTurf = async (id: string) => {
    const { error, status } = await supabase.from('turfs').delete().eq('turf_id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Deleted ${id}`);
    }
  };

  return <TurfContext.Provider value={{ turfs, addTurf, updateTurf, deleteTurf }}>{children}</TurfContext.Provider>;
};

export const useTurfContext = () => {
  return useContext<TurfContextType>(TurfContext);
};
