import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { TurfCard, Layout } from "../../../src/components";
import Carousel from "../../../src/components/Carousel";

import { Database } from "../../../src/types/database.types";

type Turf = Database["public"]["Tables"]["turfs"]["Row"];

const BookingTurf = () => {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [turfs, setTurfs] = useState<Turf[]>([]);

	const getData = useMemo(() => {
		return async () => {
			const { data, error } = await supabase.from("turfs").select("*");

			if (error) {
				toast.error(error.message);
			}

			if (data) {
				setTurfs(data);
			}
		};
	}, [supabase]);

	useEffect(() => {
		if (user) {
			getData();
		}
	}, [getData, user]);

	return (
		<Layout title="Bookings">
		<Carousel />
			<section className="w-full p-20">
				<div className="flex items-center justify-center">
					<label htmlFor="date" className="text-lg font-medium">
						Date
					</label>
					<input
						className="form-input ml-4 rounded-lg"
						type="date"
						id="date"
						name="date"
					/>
				</div>
				<hr className="my-6" />
				<div className="mx-auto w-[70%] space-y-5">
					{turfs.map((turf) => (
						<div key={turf.turf_id}>
							<TurfCard {...turf} book={true} />
						</div>
					))}
				</div>
			</section>
		</Layout>
	);
};

export default BookingTurf;
