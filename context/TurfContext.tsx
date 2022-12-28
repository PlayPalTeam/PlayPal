import { useSupabaseClient , useUser } from "@supabase/auth-helpers-react";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Database } from "../types/database.types";

const TurfContext = createContext({
    turfData :{
    },
})

export const TurfProvider = ({ children }) =>{
    const supabase = useSupabaseClient<Database>();
	const user = useUser();
    const [turfData ,setturfData] = useState({})

    useEffect(() => {
		const getTurfData = async () => {
			const { data, error } = await supabase
				.from("turfs")
				.select(`*`)
				.eq("profile_id", user?.id)
				.single();
			if (error) {
				console.log(error.code);
				console.log(error.hint);
				console.log(error.message);
				console.log(error.details);
			}
			if (data) {
				setturfData(data);
			}
		};

		getTurfData();
        console.log("")
	}, [supabase, user?.id]);

    return (
		<TurfContext.Provider value={{ turfData }}>
			{children}
		</TurfContext.Provider>
	);
}


export const useTurfData =()=> useContext(TurfContext)