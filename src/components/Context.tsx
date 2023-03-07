import { SessionContextProvider, Session, SupabaseClient } from '@supabase/auth-helpers-react';
import { BookingProvider } from '@context/BookingContext';
import { RequestProvider } from '@context/RequestContext';
import { TurfProvider } from '@context/TurfContext';
import { UserProfileProvider } from '@context/UserProfileContext';
import { memo, ReactNode, useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

interface ContextProps {
  initialSession: Session;
  children: ReactNode;
}

const Context = ({ children, initialSession }: ContextProps) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

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

export default memo(Context);
