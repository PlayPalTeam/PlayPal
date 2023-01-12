import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useBookContext } from "../../src/context/BookingContext";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Layout } from "../../src/components";

const ProfileCard = dynamic(() => import("../../src/components/ProfileCard"));
const BookingCard = dynamic(() => import("../../src/components/BookingCard"));

const User = () => {
	const { books } = useBookContext();

	// useMemo to memoize the book elements so that it is not recreated on every render
	const bookElements = useMemo(
		() => books.map((book) => <BookingCard key={book.booking_id} {...book} />),
		[books]
	);

	return (
		<Layout title={"DashBoard"}>
			<div>
				<ProfileCard />
				<hr className="my-5" />
				<div className="flex items-center justify-between max-md:flex-col">
					<h2>Bookings</h2>
					<Link
						className="float-right flex w-max items-center justify-end gap-x-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-green-600"
						href={"/user/booking"}
					>
						<p>Book Turf</p>
						<AiOutlinePlus />
					</Link>
				</div>
				<div className="mt-5 flex flex-col space-y-5">{bookElements}</div>
			</div>
		</Layout>
	);
};

export default User;
