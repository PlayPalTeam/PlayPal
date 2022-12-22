import { supabase } from "./supabase";

export const getRole = async (id: string) => {
	const role = supabase.from("profiles").select("role").eq("id", id).single();

	return role;
};
