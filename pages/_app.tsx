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
import { Inter } from "@next/font/google";
import { BookingProvider } from "../src/context/BookingContext";

const inter = Inter({ weight: "400", subsets: ["latin"] });

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
			<BookingProvider>
				<TurfProvider>
					<UserProfileProvider>
						<main className={inter.className}>
							<Component {...pageProps} />
						</main>
					</UserProfileProvider>
				</TurfProvider>
			</BookingProvider>
		</SessionContextProvider>
	);
}

export default App;
