import { RequestResponse } from '@components/RequestCard';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useHelper from '@utils/helper';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react';
import { Database } from '../types/database.types';

type RequestInsert = Database['public']['Tables']['requests']['Insert'];

type RequestUpdate = Database['public']['Tables']['requests']['Update'];

interface RequestContexType {
  requests: RequestResponse[];
  updatePlayerNeeded: (requestUpdate: RequestUpdate) => Promise<void>;
  addRequest: (request: RequestInsert) => Promise<void>;
  deleteRequest: (id: number) => Promise<void>;
  getRequestsData: () => Promise<void>;
}

export const RequestContext = createContext<RequestContexType>({
  requests: [],
  updatePlayerNeeded: () => Promise.resolve(),
  addRequest: () => Promise.resolve(),
  deleteRequest: () => Promise.resolve(),
  getRequestsData: () => Promise.resolve()
});

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequest] = useState<RequestResponse[]>([]);
  const { ErrorMessage, SuccessMessage } = useHelper();
  const supabase = useSupabaseClient<Database>();

  const user = useUser();

  const getRequestsData = useCallback(async () => {
    if (!navigator.onLine) {
      ErrorMessage({ message: "No internet connection, can't fetch data." });
      return;
    }
    const { data, error } = await supabase
      .from('requests')
      .select('*, profiles(full_name), turfs(turf_name, location)');

    if (error) {
      ErrorMessage({ message: error.message });
    }

    if (data) {
      setRequest(data);
    }
  }, [ErrorMessage, supabase]);

  const addRequest = async (request: RequestInsert) => {
    const { error } = await supabase
      .from('requests')
      .insert({ ...request, profile_id: user.id });

    if (error) {
      ErrorMessage({ message: error.message });
    }

    SuccessMessage({ message: 'Your request is created' });
    getRequestsData();
  };

  async function updatePlayerNeeded(requestUpdate: RequestUpdate) {
    const { status, error } = await supabase
      .from('requests')
      .update(requestUpdate)
      .eq('id', requestUpdate?.id);

    if (status === 204) {
      SuccessMessage({ message: 'Success' });
    }

    if (error) {
      ErrorMessage({ message: error.message });
    }

    getRequestsData();
  }

  const deleteRequest = async (id: number) => {
    const { status, error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id);

    if (error) {
      ErrorMessage({ message: error.message });
    }

    if (status === 204) {
      SuccessMessage({ message: 'Your request is deleted' });
    }

    getRequestsData();
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        updatePlayerNeeded,
        addRequest,
        deleteRequest,
        getRequestsData
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => {
  return useContext<RequestContexType>(RequestContext);
};
