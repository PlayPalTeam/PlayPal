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

type Request = Database["public"]["Tables"]["requests"]["Row"];
type RequestInsert = Database["public"]["Tables"]["requests"]["Insert"];
type RequestUpdate = Database["public"]["Tables"]["requests"]["Update"];

interface RequestContexType {
	requests: Request[];
	addRequest: (request: RequestInsert) => Promise<void>;
	updateRequest: (id: string, request: RequestUpdate) => Promise<void>;
	deleteRequest: (id: string) => Promise<void>;
}

export const RequestContext = createContext<RequestContexType>({
	requests: [],
	addRequest: () => Promise.resolve(),
	updateRequest: () => Promise.resolve(),
	deleteRequest: () => Promise.resolve(),
});

export const RequestProvider = ({ children }: { children: ReactNode }) => {
	const [requests, setRequest] = useState<Request[]>([]);

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const getRequests = useMemo(() => {
		return async () => {
			const { data, error } = await supabase.from("requests").select("*");

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
		await supabase.from("requests").insert({ ...request, profile_id: user.id });
	};

	const updateRequest = async () => {};

	const deleteRequest = async () => {};

	return (
		<RequestContext.Provider
			value={{ requests, addRequest, updateRequest, deleteRequest }}
		>
			{children}
		</RequestContext.Provider>
	);
};

export const useRequestContext = () => {
	return useContext<RequestContexType>(RequestContext);
};
