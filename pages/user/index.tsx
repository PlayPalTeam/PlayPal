import Head from "next/head";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { BookingCard, Navbar, ProfileCard } from "../../src/components";
import { useBookContext } from "../../src/context/BookingContext";

const User = () => {
	const { books } = useBookContext();

	return (
		<>
			<Head>
				<title>PlayPal</title>
			</Head>
			<main className="flex">
				<Navbar />
				<section className="w-full p-20">
					<div>
						<ProfileCard />
						<hr className="my-5" />
						<div className="flex items-center justify-between">
							<h2>Bookings</h2>
							<Link
								className="float-right flex w-max items-center justify-end gap-x-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-green-600"
								href={"/user/booking"}
							>
								<p>Book Turf</p>
								<AiOutlinePlus />
							</Link>
						</div>
						<div className="flex flex-col space-y-5 mt-5">
							{books.map((book) => (
								<BookingCard key={book.booking_id} {...book} />
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default User;
