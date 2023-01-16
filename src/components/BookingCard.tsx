interface BookingCardProps {
	date: string;
	start_time: string;
	end_time: string;
}

const BookingCard = ({ date, end_time, start_time }: BookingCardProps) => {
	return (
		<div className="flex h-20 border flex-col">
			<p>{date}</p>
			<p>{end_time}</p>
			<p>{start_time}</p>
		</div>
	);
};

export default BookingCard;
