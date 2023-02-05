import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useHelper from '@utils/helper';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback
} from 'react';
import { Database } from '../types/database.types';

type Turf = Database['public']['Tables']['turfs']['Row'];
type TurfInsert = Database['public']['Tables']['turfs']['Insert'];
type TurfUpdate = Database['public']['Tables']['turfs']['Update'];

interface TurfContextType {
  turfs: Turf[];
  addTurf: (turf: TurfInsert) => Promise<void>;
  updateTurf: (id: string, update: TurfUpdate) => Promise<void>;
  deleteTurf: (id: string) => Promise<void>;
  getData: () => Promise<void>;
}

const TurfContext = createContext<TurfContextType>({
  turfs: [],
  addTurf: () => Promise.resolve(),
  updateTurf: () => Promise.resolve(),
  deleteTurf: () => Promise.resolve(),
  getData: () => Promise.resolve()
});

export const TurfProvider = ({ children }: { children: ReactNode }) => {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const { ErrorMessage, SuccessMessage } = useHelper();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const getData = useCallback(async () => {
    if (!navigator.onLine) {
      ErrorMessage({ message: "No internet connection, can't fetch data." });
      return;
    }
    const { data, error } = await supabase.from('turfs').select('*');
    if (error) {
      ErrorMessage({ message: error.message });
    }
    if (data) {
      setTurfs(data);
    }
  }, [ErrorMessage, supabase]);

  const addTurf = useCallback(
    async (turf: TurfInsert) => {
      await supabase.from('turfs').insert({ ...turf, profile_id: user?.id });
    },
    [supabase, user]
  );

  const updateTurf = async (id: string, update: TurfUpdate) => {
    const { error, status } = await supabase
      .from('turfs')
      .update(update)
      .eq('id', id);

    if (error) {
      ErrorMessage({ message: error.message });
      return;
    }

    if (status === 204) {
      getData();
      SuccessMessage({ message: `Turf Updated Successfully` });
    }
  };

  const deleteTurf = async (id: string) => {
    const { error, status } = await supabase
      .from('turfs')
      .delete()
      .eq('turf_id', id);

    if (error) {
      ErrorMessage({ message: error.message });
    }

    if (status === 204) {
      SuccessMessage({ message: `Deketed ${id}` });
    }
  };

  return (
    <TurfContext.Provider
      value={{ turfs, addTurf, updateTurf, deleteTurf, getData }}
    >
      {children}
    </TurfContext.Provider>
  );
};

export const useTurfContext = () => {
  return useContext<TurfContextType>(TurfContext);
};
