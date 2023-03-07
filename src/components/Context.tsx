import { SessionContextProvider, Session, SupabaseClient } from '@supabase/auth-helpers-react';
import { BookingProvider } from '@context/BookingContext';
import { RequestProvider } from '@context/RequestContext';
import { TurfProvider } from '@context/TurfContext';
import { UserProfileProvider } from '@context/UserProfileContext';
import { ReactNode } from 'react';

interface ContextProps {
  supabase: SupabaseClient<any, 'public', any>;
  initialSession: Session;
  children: ReactNode;
}

const Context = ({ children, initialSession, supabase }: ContextProps) => {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      <UserProfileProvider>
        <RequestProvider>
          <BookingProvider>
            <TurfProvider>{children}</TurfProvider>
          </BookingProvider>
        </RequestProvider>
      </UserProfileProvider>
    </SessionContextProvider>
  );
};

export default Context;
