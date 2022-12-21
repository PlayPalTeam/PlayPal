import { supabase } from "./supabase";

export const getRole = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();

	if (session) {
		return data.role;
	}
};
