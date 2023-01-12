import { useRouter } from "next/router";
import { useTurfContext } from "../../../src/context/TurfContext";
import Link from "next/link";
import { Form, FormTitle, Layout } from "../../../src/components";
import { BookingForm } from "../../../src/content/contents";
import { SubmitHandler } from "react-hook-form";
import { BookingType } from "../../../src/types/types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../../../src/types/database.types";
import { toast, Toaster } from "react-hot-toast";

const Book = () => {
	const router = useRouter();

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const { turfs } = useTurfContext();

	const { id } = router.query;

	const turf = turfs.find((t) => t.turf_id === id);

	const onSubmit: SubmitHandler<BookingType> = async (data) => {
		const { error } = await supabase
			.from("bookings")
			.insert({ ...data, profile_id: user.id, turf_id: id as string });

		if (error) {
			toast.error(error.message, { duration: 5000 });
		}

		toast.success("Your place is booked");
	};

	return (
		<Layout title={turf?.turf_name}>
			<main className="flex h-screen items-center justify-center">
				<Toaster />
				<div className="flex w-full max-w-2xl items-center border">
					<section className="px-20">
						<h1>Booking for {turf?.turf_name}</h1>
						<p>Location: {turf?.location}</p>
						<p>Size: {turf?.capacity}</p>
						<p>Price: {turf?.price_per_hour}/hour</p>
					</section>
					<section className="p-5">
						<FormTitle title="Book" />
						<Form
							formFields={BookingForm}
							onSubmit={onSubmit}
							form={"Booking"}
							buttonType={"submit"}
							buttonText={"Book Now"}
						/>
						<Link href="/user/booking">Back to turf list</Link>
					</section>
				</div>
			</main>
		</Layout>
	);
};

export default Book;
