import { useUser } from "@supabase/auth-helpers-react";
import { memo } from "react";
import { useRequestContext } from "../context/RequestContext";
import { useUserProfile } from "../context/UserProfileContext";

interface RequestCardProps {
	id: number;
	game: string;
	player_needed: number;
	date: string;
	profile_id: string;
	book: {
		start_time: string;
		end_time: string;
		turfs: {
			turf_name: string;
			location: string;
		};
	}[];
	isButtonVisible?: boolean;
}

const RequestCard = ({
	id,
	game,
	player_needed,
	date,
	book,
	profile_id,
	isButtonVisible = true,
}: RequestCardProps) => {
	const { userProfile, updateUserProfile } = useUserProfile();
	const { updatePlayerNeeded, deleteRequest } = useRequestContext();

	const { full_name, phone_number } = userProfile;

	const user = useUser();

	function handleAccept() {
		updatePlayerNeeded(id, player_needed, full_name, phone_number);
		updateUserProfile({ request: [id.toString()] });
	}

	function handleDelete() {
		deleteRequest(id);
	}
	return (
		<div className="overflow-hidden rounded-lg shadow-md">
			<div className="bg-green-400 py-2 px-2 md:px-6 md:py-4">
				<div className="mb-2 text-lg font-medium">{game}</div>
				<p className="text-base text-gray-700">
					Players needed: {player_needed}
				</p>
			</div>
			<section className="flex justify-between px-3 py-2 max-md:flex-col md:px-6 md:py-4">
				<div>
					<p className="text-base text-gray-700">Date: {date}</p>
					<ul>
						{book.map((book, index) => (
							<li key={index} className="text-gray-700">
								<p>
									Timing: {book.start_time} to {book.end_time}
								</p>
								<p>
									{book.turfs.turf_name} ({book.turfs.location})
								</p>
							</li>
						))}
					</ul>
				</div>
				{isButtonVisible && (
					<>
						{profile_id === user?.id ? (
							<button
								onClick={handleDelete}
								className={`rounded-md bg-red-500 px-4 py-2 max-md:mt-4`}
								type="button"
							>
								Delete
							</button>
						) : (
							<button
								onClick={handleAccept}
								className={`rounded-md ${
									player_needed === 0 ? "bg-gray-500" : "bg-blue-500"
								} px-4 py-2 max-md:mt-4`}
								type="button"
								disabled={player_needed === 0 ? true : false}
							>
								Accept
							</button>
						)}
					</>
				)}
			</section>
		</div>
	);
};

export default memo(RequestCard);
