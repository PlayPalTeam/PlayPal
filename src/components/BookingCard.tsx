import { ImLocation } from "react-icons/im"

interface BookingCardProps {
	date: string;
	start_time: string;
	end_time: string;
	turfs: { turf_name: string; location: string };
}

const BookingCard = ({ date, end_time, start_time, turfs }: BookingCardProps) => {
	return (
		<div className="shadow-md">
			<div className="p-4 md:flex items-center justify-between">
				<h2 className="font-semibold truncate w-1/3 text-lg md:text-xl capitalize">{turfs.turf_name}</h2>
				<div className="mt-2 w-2/3 md:flex justify-between items-center text-gray-600">
					<div className="">
						<p className="">Date: {date}</p>
						<p className="">Timing: {start_time} - {end_time}</p>
					</div>
					<div className="flex items-center">
						<ImLocation className="" />
						<p className="">{turfs.location}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
