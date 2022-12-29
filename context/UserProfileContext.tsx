import useSWR from "swr";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { UserProfileType } from "../types/types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

type UserProfileContextType = {
	userProfile: UserProfileType;
};

const UserProfileContext = createContext<UserProfileContextType>({
	userProfile: {},
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
	const [userProfile, setUserProfile] = useState({});

	const supabase = useSupabaseClient();

	const user = useUser();

	useEffect(() => {
		const getUserData = async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select(`username, full_name, avatar_url, locality`)
				.eq("id", user.id)
				.single();

			if (error) {
				console.log(error.message);
			}

			if (data) {
				setUserProfile(data);
			}
		};
		if (user) {
			getUserData();
		}
	}, [supabase, user, user?.id]);

	return (
		<UserProfileContext.Provider value={{ userProfile }}>
			{children}
		</UserProfileContext.Provider>
	);
};

export const useUserProfile = () => useContext(UserProfileContext);
