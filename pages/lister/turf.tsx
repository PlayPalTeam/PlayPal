import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../../types/database.types";

const Turfs = () => {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [data, setData] = useState({});

	useEffect(() => {
		const getTurfData = async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select(`*, turfs(*)`)
				.eq("id", user?.id)
				.single();
			if (error) {
				console.log(error.code);
				console.log(error.hint);
				console.log(error.message);
				console.log(error.details);
			}
			if (data) {
				setData(data);
			}
		};

		getTurfData();
	}, [supabase, user?.id]);

	return (
		<div>
      {JSON.stringify(data)}
			
			<form></form>
		</div>
	);
};

export default Turfs;
