import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { memo } from "react";
import toast from "react-hot-toast";
import { Database } from "../types/database.types";

interface RequestCardProps {
	id: string;
	game: string;
	player_needed: number;
	date: string;
	book: {
		start_time: string;
		end_time: string;
		turfs: {
			turf_name: string;
			location: string;
		};
	}[];
}

const RequestCard = ({
	id,
	game,
	player_needed,
	date,
	book,
}: RequestCardProps) => {
	const supabase = useSupabaseClient<Database>();

	async function handleClick() {
		const { data, error } = await supabase
			.from("requests")
			.update({ player_needed: player_needed - 1 })
			.eq("request_id", id)
			.select("*");

		console.log(data);

		if (data) {
			toast.success("Success", { duration: 1000 });
		}

		if (error) {
			toast.error(error.message, { duration: 1000 });
		}
	}

	return (
		<div className="overflow-hidden rounded-lg shadow-md">
			<div className="bg-green-400 px-6 py-4">
				<div className="mb-2 text-lg font-medium">{game}</div>
				<p className="text-base text-gray-700">
					Players needed: {player_needed}
				</p>
			</div>
			<section className="flex flex-wrap justify-between px-6 py-4">
				<div>
					<p className="text-base text-gray-700">Date: {date}</p>
					<ul>
						{book.map((book, index) => (
							<li key={index} className="text-gray-700">
								{book.start_time} to {book.end_time} at {book.turfs.turf_name} (
								{book.turfs.location})
							</li>
						))}
					</ul>
				</div>
				<button
					className="rounded-md bg-blue-500 px-4 py-2"
					type="button"
					onClick={handleClick}
				>
					Accept
				</button>
			</section>
		</div>
	);
};

export default memo(RequestCard);
