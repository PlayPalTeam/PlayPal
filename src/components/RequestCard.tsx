import { useUser } from "@supabase/auth-helpers-react";
import { memo, useCallback, useMemo } from "react";
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

/**
 * RequestCard component that renders a card displaying information about a request for a game
 * such as the game's name, the number of players needed, and the date and location of the game.
 * It also includes buttons to accept or delete the request, which are dependent on whether
 * the user is the creator of the request or not
 *
 * @param {RequestCardProps} props - Props for the component
 */
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
	const user = useUser();

	/**
	 * Handle the event when accept button is clicked
	 */
	const handleAccept = useCallback(() => {
		updatePlayerNeeded(
			id,
			player_needed,
			userProfile.full_name,
			userProfile.phone_number
		);
		updateUserProfile({ request: [id.toString()] });
	}, [id, player_needed, userProfile, updatePlayerNeeded, updateUserProfile]);

	/**
	 * Handle the event when delete button is clicked
	 */
	const handleDelete = useCallback(() => {
		deleteRequest(id);
	}, [id, deleteRequest]);

	/**
	 * Memoize the mapped array so that it only gets recreated if the 'book' prop changes
	 */
	const mappedBook = useMemo(() => {
		return book.map((book, index) => (
			<li key={index} className="text-gray-700">
				<p>
					Timing: {book.start_time} to {book.end_time}
				</p>
				<p>
					{book.turfs.turf_name} ({book.turfs.location})
				</p>
			</li>
		));
	}, [book]);

	return (
		<div className="overflow-hidden rounded-lg shadow-card">
			<div className="bg-green-400 py-2 px-2 md:px-6 md:py-4">
				<div className="mb-2 text-lg font-medium">{game}</div>
				<p className="text-base text-gray-700">
					Players needed: {player_needed}
				</p>
			</div>
			<section className="flex justify-between px-3 py-2 max-md:flex-col md:px-6 md:py-4">
				<div>
					<p className="text-base text-gray-700">Date: {date}</p>
					<ul>{mappedBook}</ul>
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
								disabled={player_needed === 0}
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
