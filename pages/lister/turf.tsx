import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useTurfData } from "../../context/TurfContext";
import { Database } from "../../types/database.types";

const Turfs = () => {
	const { turfData } = useTurfData()
	console.log(turfData)

	return (
		<div>

			
			<form></form>
		</div>
	);
};

export default Turfs;
