import { RequestResponse } from '@components/RequestCard';
import { supabase } from '@lib/supabase';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';
import { useUserProfile } from './UserProfileContext';

type RequestInsert = Database['public']['Tables']['requests']['Insert'];

type RequestUpdate = Database['public']['Tables']['requests']['Update'];

interface RequestContexType {
  requests: RequestResponse[];
  updatePlayerNeeded: (requestUpdate: RequestUpdate) => Promise<void>;
  addRequest: (request: RequestInsert) => Promise<void>;
  deleteRequest: (id: number) => Promise<void>;
}

export const RequestContext = createContext<RequestContexType>({
  requests: [],
  updatePlayerNeeded: () => Promise.resolve(),
  addRequest: () => Promise.resolve(),
  deleteRequest: () => Promise.resolve()
});

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequest] = useState<RequestResponse[]>([]);
  const user = useUser();
  const { userProfile } = useUserProfile();

  const getRequests = useCallback(async () => {
    const { data, error } = await supabase.from('requests').select('*, profiles(full_name), turfs(turf_name, address)');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setRequest(data);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getRequests();
    }
  }, [getRequests, user, userProfile?.role]);

  const addRequest = async (request: RequestInsert) => {
    const { error } = await supabase.from('requests').insert({ ...request, profile_id: user?.id });

    if (error) {
      toast.error(error.message);
    }


  };

  async function updatePlayerNeeded(requestUpdate: RequestUpdate) {
    const { status, error } = await supabase.from('requests').update(requestUpdate).eq('id', requestUpdate?.id);

    if (status === 204) {
      toast.success('Success');
    }

    if (error) {
      toast.error(error.message);
    }
  }

  const deleteRequest = async (id: number) => {
    const { status, error } = await supabase.from('requests').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
    }

    if (status === 204) {
      toast.success('Your request is deleted');
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        updatePlayerNeeded,
        addRequest,
        deleteRequest
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => {
  return useContext<RequestContexType>(RequestContext);
};
