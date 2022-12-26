import useSWR from "swr";
import { createContext, ReactNode, useContext, useState } from "react";
import { UserProfileType } from "../types/types";

type UserProfileContextType = {
	userProfile: UserProfileType;
	setUserProfile: (userProfile: { [key: string]: any }) => void;
};

const UserProfileContext = createContext<UserProfileContextType>({
	userProfile: {},
	setUserProfile: () => {},
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
	const { data, error } = useSWR<UserProfileType>("/api/profile", fetcher);

	const [userProfile, setUserProfile] = useState(data);

	return (
		<UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
			{children}
		</UserProfileContext.Provider>
	);
};

export const useUserProfile = () => useContext(UserProfileContext);
