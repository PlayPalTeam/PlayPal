import { RequestResponse } from "@components/RequestCard";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { toast } from "react-hot-toast";
import { Database } from "../types/database.types";

type RequestInsert = Database["public"]["Tables"]["requests"]["Insert"];

interface RequestContexType {
	requests: RequestResponse[];
	updatePlayerNeeded: (
		id: number,
		player: number,
		name: string,
		phone: number
	) => Promise<void>;
	addRequest: (request: RequestInsert) => Promise<void>;
	deleteRequest: (id: number) => Promise<void>;
}

export const RequestContext = createContext<RequestContexType>({
	requests: [],
	updatePlayerNeeded: () => Promise.resolve(),
	addRequest: () => Promise.resolve(),
	deleteRequest: () => Promise.resolve(),
});

export const RequestProvider = ({ children }: { children: ReactNode }) => {
	const [requests, setRequest] = useState<RequestResponse[]>([]);

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const getRequests = useMemo(() => {
		return async () => {
			const { data, error } = await supabase.from("requests").select("id,profile_id, game, game_date, player_needed, profiles(full_name), turfs(turf_name, location)");

			if (error) {
				toast.error(error.message, {
					duration: 5000,
					style: {
						border: "1px solid red",
						color: "red",
					},
				});
			}

			if (data) {
				setRequest(data);
			}
		};
	}, [supabase]);

	useEffect(() => {
		if (user) {
			getRequests();
		}
	}, [getRequests, user]);

	const addRequest = async (request: RequestInsert) => {
		const { error } = await supabase
			.from("requests")
			.insert({ ...request, profile_id: user.id });

		if (error) {
			toast.error(error.message, { duration: 5000 });
		}

		toast.success("Your request is created", { duration: 5000 });
		getRequests();
	};

	async function updatePlayerNeeded(
		id: number,
		player: number,
		name: string,
		phone: number
	) {
		const { status, error } = await supabase
			.from("requests")
			.update({
				player_needed: player - 1,
				people: [{ name: name, phone: phone }],
			})
			.eq("id", id);

		if (status === 204) {
			toast.success("Success", { duration: 1000 });
		}

		if (error) {
			toast.error(error.message, { duration: 1000 });
		}

		getRequests();
	}

	const deleteRequest = async (id: number) => {
		const { status, error } = await supabase
			.from("requests")
			.delete()
			.eq("id", id);

		if (error) {
			toast.error(error.message, { duration: 5000 });
		}

		if (status === 204) {
			toast.success("Your request is deleted", { duration: 1000 });
		}

		getRequests();
	};

	return (
		<RequestContext.Provider
			value={{
				requests,
				updatePlayerNeeded,
				addRequest,
				deleteRequest,
			}}
		>
			{children}
		</RequestContext.Provider>
	);
};

export const useRequestContext = () => {
	return useContext<RequestContexType>(RequestContext);
};
