import { Navbar, TurfCard } from "../../src/components";
import { useTurfContext } from "../../src/context/TurfContext";

const BookingTurf = () => {
	const { turfs } = useTurfContext();

	return (
		<>
			<main className="flex">
				<Navbar />
				<section className="p-10">
					<input className="form-input" type="date" name="date" id="date" />
					{/* Search for place based on area */}
					{/* Turf card with book button */}
					<div>
						{turfs.map((turf) => (
							<div key={turf.turf_id}>
								<TurfCard {...turf} />
							</div>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export default BookingTurf;
