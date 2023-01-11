import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useCallback,
} from "react";
import { toast } from "react-hot-toast";

interface UseSupabaseData<T> {
	data: T[];
	setData: Dispatch<SetStateAction<T[]>>;
	fetchData: () => Promise<void>;
	insertData: (data: T) => Promise<void>;
	updateData: (id: string, data: T) => Promise<void>;
	deleteData: (id: string) => Promise<void>;
}

const useSupabaseData = <T extends object>(
	table: string
): UseSupabaseData<T> => {
	const [data, setData] = useState<T[]>([]);
	const supabase = useSupabaseClient();
	const user = useUser();

	const fetchData = useCallback(async () => {
		const { data: results, error } = await supabase.from(table).select("*");

		if (error) {
			toast.error(error.message);
		}

		if (results) {
			setData(results);
		}
	}, [supabase, table]);

	useEffect(() => {
		if (user) {
			fetchData();
		}
	}, [fetchData, user]);

	const insertData = useCallback(
		async (data: T) => {
			await supabase.from(table).insert(data);
			fetchData();
		},
		[fetchData, supabase, table]
	);

	const updateData = useCallback(
		async (id: string, data: T) => {
			await supabase.from(table).update(id, data);
			fetchData();
		},
		[fetchData, supabase, table]
	);

	const deleteData = useCallback(
		async (id: string) => {
			await supabase.from(table).delete().eq("id", id);
			fetchData();
		},
		[fetchData, supabase, table]
	);

	return { data, setData, fetchData, insertData, updateData, deleteData };
};

export default useSupabaseData;
