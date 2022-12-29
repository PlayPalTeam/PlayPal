import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from "react";
import { toast } from "react-hot-toast";
import { Database } from "../types/database.types";

const TurfContext = createContext({
	TurfData: {},
});

export const TurfProvider = ({ children }: { children: ReactNode }) => {
	const [TurfData, setTurfData] = useState({});

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	useEffect(() => {
		const getTurfData = async () => {
			const { data, error } = await supabase
				.from("turfs")
				.select("*")
				.eq("profile_id", user.id);

			if (error) {
				toast.error(error.message);
			}

			if (data) {
				setTurfData(data);
			}
		};
		if (user) {
			getTurfData();
		}
	}, [supabase, user, user?.id]);

	return (
		<TurfContext.Provider value={{ TurfData }}>{children}</TurfContext.Provider>
	);
};

export const useTurfContext = () => useContext(TurfContext);
