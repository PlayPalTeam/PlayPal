import { BookingProvider } from '@context/BookingContext';
import { RequestProvider } from '@context/RequestContext';
import { TurfProvider } from '@context/TurfContext';
import { UserProfileProvider } from '@context/UserProfileContext';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { ReactNode, memo, useState } from 'react';

interface ContextProps {
  initialSession: Session;
  children: ReactNode;
}

const Context = ({ children, initialSession }: ContextProps) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
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
