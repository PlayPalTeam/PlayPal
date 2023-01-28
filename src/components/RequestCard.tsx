import { useRequestContext } from "@context/RequestContext";
import { useUserProfile } from "@context/UserProfileContext";
import { useUser } from "@supabase/auth-helpers-react";
import { memo, useCallback } from "react";

export interface RequestResponse {
	id: number;
	profile_id: string;
	game: string;
	game_date: string;
	player_needed: number;
	profiles: {
		full_name: string;
	} | {
		full_name: string;
	}[];
	turfs: {
		turf_name: string;
		location: string;
	} | {
		turf_name: string;
		location: string;
	}[];
}

const RequestCard = ({ id, game, game_date, player_needed, profiles, turfs, profile_id }: RequestResponse) => {
	const { deleteRequest } = useRequestContext();
	const { userProfile, updateUserProfile } = useUserProfile()
	const { updatePlayerNeeded } = useRequestContext()

	const user = useUser()

	const handleAccept = useCallback(() => {
		updatePlayerNeeded(id, player_needed, userProfile?.full_name, userProfile?.phone_number)
		updateUserProfile({ request: [id.toString()] })
	}, [id, player_needed, updatePlayerNeeded, updateUserProfile, userProfile?.full_name, userProfile?.phone_number])

	const handleDelete = useCallback(() => {
		deleteRequest(id);
	}, [id, deleteRequest]);

	return (
		<div className="bg-white rounded-lg p-6 shadow-md">
			<div className="text-lg font-medium">Game: {game}</div>
			<div className="text-sm text-gray-600">Game Date: {game_date}</div>
			<div className="text-sm text-gray-600">Player Needed: {player_needed}</div>
			<div className="my-4">
				{Array.isArray(profiles) ? (
					profiles.map((profile, i) => (
						<div key={i} className="text-sm text-gray-600">
							{profile.full_name}
						</div>
					))
				) : (
					<div className="text-sm text-gray-600">{profiles.full_name}</div>
				)}
			</div>
			<div className="my-4">
				{Array.isArray(turfs) ? (
					turfs.map((turf, i) => (
						<div key={i} className="text-sm text-gray-600">
							<div>Turf Name: {turf.turf_name}</div>
							<div>Location: {turf.location}</div>
						</div>
					))
				) : (
					<div className="text-sm text-gray-600">
						<div>Turf Name: {turfs.turf_name}</div>
						<div>Location: {turfs.location}</div>
					</div>
				)}
			</div>
			<hr className="mb-5 border-black" />
			<div>
				{profile_id === user?.id ? (
					<button onClick={handleDelete} className="bg-red-500 text-white rounded-lg p-2">Delete</button>
				) : (
					<button
						disabled={userProfile.request.some(id => id === id) || player_needed === 0 ? true : false}
						onClick={handleAccept}
						className={`text-white rounded-lg p-2 ${userProfile.request.some(id => id === id) || player_needed === 0 ? "bg-gray-500" : "bg-green-500"}`}>
						Accept</button>
				)}
			</div>
		</div>
	);
};

export default memo(RequestCard);

