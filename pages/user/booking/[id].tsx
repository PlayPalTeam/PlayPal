import { useRouter } from "next/router";
import { useTurfContext } from "../../../src/context/TurfContext";
import Link from "next/link";
import { Form, FormTitle } from "../../../src/components";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BookingForm } from "../../../src/content/contents";

const Book = () => {
	const router = useRouter();
	const supabase = useSupabaseClient();

	const { turfs } = useTurfContext();

	const { id } = router.query;

	const turf = turfs.find((t) => t.turf_id === id);

	const onSubmit = async () => {};

	return (
		<main className="flex h-screen items-center justify-center">
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
						form={"SignIn"}
						buttonType={"submit"}
						buttonText={"Book Now"}
					/>

					<Link href="/user/booking">Back to turf list</Link>
				</section>
			</div>
		</main>
	);
};

export default Book;
