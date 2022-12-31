import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import {
	createBrowserSupabaseClient,
	Session,
} from "@supabase/auth-helpers-nextjs";
import { UserProfileProvider } from "../src/context/UserProfileContext";
import { TurfProvider } from "../src/context/TurfContext";

function App({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	// Create a new supabase browser client on every first render.
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<TurfProvider>
				<UserProfileProvider>
					<Component {...pageProps} />
				</UserProfileProvider>
			</TurfProvider>
		</SessionContextProvider>
	);
}

export default App;
