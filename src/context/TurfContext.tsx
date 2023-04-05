import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';

type Turf = Database['public']['Tables']['turfs']['Row'];
type TurfUpdate = Database['public']['Tables']['turfs']['Update'];

interface TurfContextType {
  turfs: Turf[];
  allTurfs: Turf[];
  updateTurf: (id: string, update: TurfUpdate) => Promise<void>;
  deleteTurf: (id: string) => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
}

export const TurfContext = createContext<TurfContextType>({
  turfs: [],
  allTurfs: [],
  updateTurf: () => Promise.resolve(),
  deleteTurf: () => Promise.resolve(),
  fetchOne: () => Promise.resolve()
});

export const TurfProvider = ({ children }: { children: ReactNode }) => {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [allTurfs, setAllTurfs] = useState<Turf[]>([]);

  const user = useUser();

  const fetchTurfs = useCallback(async () => {
    const { data, error } = await supabase.from('turfs').select('*').eq('profile_id', user?.id);

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setTurfs(data);
    }
  }, [user?.id]);


  
  const fetchOne = async (id: string) => {
    const { error, status } = await supabase.from('turfs').select('*').eq('turf_id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Deleted ${id}`);
    }
  };



  const fetchAllTurfs = useCallback(async () => {
    const { data, error } = await supabase.from('turfs').select('*');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setAllTurfs(data);
    }
  }, []);

  useEffect(() => {
    const role = user?.user_metadata.role;
    if (user) {
      role === 'lister' ? fetchTurfs() : fetchAllTurfs();
    }
  }, [fetchAllTurfs, fetchTurfs, user]);

  const updateTurf = async (id: string, update: TurfUpdate) => {
    const { status, error } = await supabase.from('turfs').update(update).eq('turf_id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Update done for ${id}`);
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

  return <TurfContext.Provider value={{ turfs, allTurfs, updateTurf, deleteTurf ,fetchOne }}>{children}</TurfContext.Provider>;
};

export const useTurfContext = () => {
  return useContext<TurfContextType>(TurfContext);
};
