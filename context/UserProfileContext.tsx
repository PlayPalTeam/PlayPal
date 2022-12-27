import useSWR from "swr";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { UserProfileType } from "../types/types";

type UserProfileContextType = {
	userProfile: UserProfileType;
};

const UserProfileContext = createContext<UserProfileContextType>({
	userProfile: {},
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
	const { data, error } = useSWR<UserProfileType>("/api/profile", fetcher);

	const [userProfile, setUserProfile] = useState({});

	useEffect(() => {
		if (!error && data) {
			setUserProfile(data);
		}
	}, [data, error]);

	return (
		<UserProfileContext.Provider value={{ userProfile }}>
			{children}
		</UserProfileContext.Provider>
	);
};

export const useUserProfile = () => useContext(UserProfileContext);
