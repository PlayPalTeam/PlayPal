import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  ReactNode,
  useMemo,
  useEffect
} from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';

type Turf = Database['public']['Tables']['turfs']['Row'];
type TurfInsert = Database['public']['Tables']['turfs']['Insert'];
type TurfUpdate = Database['public']['Tables']['turfs']['Update'];

interface TurfContextType {
  turfs: Turf[];
  setTurfs: Dispatch<SetStateAction<Turf[]>>;
  addTurf: (turf: TurfInsert) => Promise<void>;
  updateTurf: (id: string, update: TurfUpdate) => Promise<void>;
  deleteTurf: (id: string) => Promise<void>;
}

export const TurfContext = createContext<TurfContextType>({
  turfs: [],
  setTurfs: () => {},
  addTurf: () => Promise.resolve(),
  updateTurf: () => Promise.resolve(),
  deleteTurf: () => Promise.resolve()
});

export const TurfProvider = ({ children }: { children: ReactNode }) => {
  const [turfs, setTurfs] = useState<Turf[]>([]);

  const supabase = useSupabaseClient<Database>();

  const user = useUser();

  const getData = useMemo(() => {
    return async () => {
      const { data, error } = await supabase.from('turfs').select('*');

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        setTurfs(data);
      }
    };
  }, [supabase]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [getData, user]);

  const addTurf = async (turf: TurfInsert) => {
    await supabase.from('turfs').insert({ ...turf, profile_id: user?.id });
  };

  const updateTurf = async (id: string, update: TurfUpdate) => {
    const { status, error } = await supabase
      .from('turfs')
      .update(update)
      .eq('id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Update done for ${update.turf_name}`);
    }
  };

  const deleteTurf = async (id: string) => {
    const { error, status } = await supabase
      .from('turfs')
      .delete()
      .eq('turf_id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success(`Deleted ${id}`);
    }
  };

  return (
    <TurfContext.Provider
      value={{ turfs, setTurfs, addTurf, updateTurf, deleteTurf }}
    >
      {children}
    </TurfContext.Provider>
  );
};

export const useTurfContext = () => {
  return useContext<TurfContextType>(TurfContext);
};
