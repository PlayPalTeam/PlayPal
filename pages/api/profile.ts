import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/database.types";

const ProtectedRoute: NextApiHandler = async (req, res) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient<Database>({ req, res });
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return res.status(401).json({
			error: "not_authenticated",
			description:
				"The user does not have an active session or is not authenticated",
		});

	// Run queries with RLS on the server
	const { data } = await supabase
		.from("profiles")
		.select(`username, full_name, avatar_url`)
		.eq("id", session.user.id)
		.single();

	res.json(data);
};

export default ProtectedRoute;
