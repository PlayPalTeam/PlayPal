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

interface RequestContexType {
	requests: Request[];
	addRequest: (request: RequestInsert) => Promise<void>;
	deleteRequest: (id: string) => Promise<void>;
}

export const RequestContext = createContext<RequestContexType>({
	requests: [],
	addRequest: () => Promise.resolve(),
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
		const { error } = await supabase
			.from("requests")
			.insert({ ...request, profile_id: user.id });

		if (error) {
			toast.error(error.message, { duration: 5000 });
		}

		toast.success("Your request is created", { duration: 5000 });
		getRequests();
	};

	const deleteRequest = async () => {};

	return (
		<RequestContext.Provider value={{ requests, addRequest, deleteRequest }}>
			{children}
		</RequestContext.Provider>
	);
};

export const useRequestContext = () => {
	return useContext<RequestContexType>(RequestContext);
};
