import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
	useMemo,
} from "react";
import { toast } from "react-hot-toast";
import { Database } from "../types/database.types";

interface UserProfileContextType {
	userProfile: Database["public"]["Tables"]["profiles"]["Row"];
	updateUserProfile: (
		update: Database["public"]["Tables"]["profiles"]["Update"]
	) => Promise<void>;
}

export const UserProfileContext = createContext<UserProfileContextType>({
	userProfile: {
		id: "",
		username: "",
		full_name: "",
		phone_number: 0,
		avatar_url: "",
		role: "",
		inserted_at: "",
		updated_at: "",
	},
	updateUserProfile: () => Promise.resolve(),
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
	const [userProfile, setUserProfile] = useState<
		Database["public"]["Tables"]["profiles"]["Row"]
	>({
		id: "",
		username: "",
		full_name: "",
		phone_number: 0,
		avatar_url: "",
		role: "",
		inserted_at: "",
		updated_at: "",
	});

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const getData = useMemo(() => {
		return async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select(`*`)
				.eq("id", user.id)
				.single();

			if (error) {
				toast.error(error.message);
			}

			if (data) {
				setUserProfile(data);
			}
		};
	}, [supabase, user?.id]);

	useEffect(() => {
		if (user) {
			getData();
		}
	}, [getData, user]);

	const updateUserProfile = async (
		update: Database["public"]["Tables"]["profiles"]["Update"]
	) => {
		const { status, error } = await supabase
			.from("profiles")
			.update(update)
			.eq("id", user.id);

		if (error) {
			toast.error(error.message);
		}

		if (status === 204) {
			toast.success(`Updated profile for ${update.full_name}`);
		}
	};

	return (
		<UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
			{children}
		</UserProfileContext.Provider>
	);
};

export const useUserProfile = () => useContext(UserProfileContext);
