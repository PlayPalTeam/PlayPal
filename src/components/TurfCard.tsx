import Link from "next/link";

interface TurfCardProps {
	turf_id: string;
	turf_name: string;
	location: string;
	book?: boolean;
}

const TurfCard = ({ turf_id, turf_name, location, book }: TurfCardProps) => {
	return (
		<div className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-green-500 p-5">
			<div>
				<p>Name: {turf_name}</p>
				<p>Location: {location}</p>
			</div>
			{book && (
				<Link
					href="/user/booking/[id]"
					as={`/user/booking/${turf_id}`}
					type="button"
					className="rounded-md bg-green-400 px-4 py-2 font-semibold hover:bg-green-500"
				>
					Book
				</Link>
			)}
		</div>
	);
};

export default TurfCard;
