import useSWR from "swr";
import Navbar from "../../components/Navbar";

import { UserProfile } from "../../types/types";

const fetcher = (url: string) =>
	fetch(url, { method: "GET" }).then((res) => res.json());

const UserProfile = () => {
	const { data, error } = useSWR<UserProfile[]>("/api/profile", fetcher);

	console.log(error);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!data) {
		return <div>Loading.....</div>;
	}

	return (
		<div className="flex">
			<Navbar />
			<div>
				{data.map((user) => (
					<section key={user.role}>
						<p>Username: {user.username}</p>
						<p>Full Name:{user.full_name}</p>
					</section>
				))}
			</div>
		</div>
	);
};

export default UserProfile;
