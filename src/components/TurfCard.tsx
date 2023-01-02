interface TurfCardProps {
	turf_name: string;
	location: string;
}

const TurfCard = ({ turf_name, location }: TurfCardProps) => {
	return (
		<div className="w-full shadow-sm shadow-green-500">
			<div>
				<p>Name: {turf_name}</p>
				<p>Location: {location}</p>
			</div>
		</div>
	);
};

export default TurfCard;
