import { Booking } from "@context/BookingContext";
import { BsCalendarDate } from "react-icons/bs"
import { BiTime } from "react-icons/bi"
import { ImLocation } from "react-icons/im";


const BookingCard = ({ date, end_time, start_time, turfs }: Booking) => {
	return (
		<div className="bg-white p-4 rounded-lg">
			<div className="text-lg font-medium flex items-center gap-x-4"><BsCalendarDate />{date}</div>
			<div className="text-gray-600 flex items-center gap-x-4"><BiTime />{start_time} - {end_time}</div>
			<div className="mt-4">
				{Array.isArray(turfs) ? (
					turfs.map((turf) => (
						<div key={turf.turf_name} className="text-gray-800">
							{turf.turf_name} - <ImLocation /> {turf.location}
						</div>
					))
				) : (
					<div className="text-gray-800 flex items-center gap-x-4">
						{turfs.turf_name} - <ImLocation /> {turfs.location}
					</div>
				)}
			</div>
		</div>
	);
};

export default BookingCard;
