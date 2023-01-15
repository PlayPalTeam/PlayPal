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
import { Roboto } from "@next/font/google";
import { BookingProvider } from "../src/context/BookingContext";
import { RequestProvider } from "../src/context/RequestContext";
import { Toaster } from "react-hot-toast";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

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
			<RequestProvider>
				<BookingProvider>
					<TurfProvider>
						<UserProfileProvider>
							<main className={inter.className}>
								<Toaster />
								<Component {...pageProps} />
							</main>
						</UserProfileProvider>
					</TurfProvider>
				</BookingProvider>
			</RequestProvider>
		</SessionContextProvider>
	);
}

export default App;
