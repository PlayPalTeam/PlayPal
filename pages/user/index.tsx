import { useBookContext } from "../../src/context/BookingContext";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CardDisclosure, Layout } from "../../src/components";
import useHelper from "../../src/utils/helper";

const ProfileCard = dynamic(() => import("../../src/components/ProfileCard"));
const BookingCard = dynamic(() => import("../../src/components/BookingCard"));
const RequestCard = dynamic(() => import("../../src/components/RequestCard"));

const User = () => {
	const { books } = useBookContext();
	const { requestDashboard } = useHelper();

	// useMemo to memoize the book elements so that it is not recreated on every render
	const bookElements = useMemo(
		() => books.map((book) => <BookingCard key={book.booking_id} {...book} />),
		[books]
	);

	const requestElement = useMemo(
		() =>
			requestDashboard.map((request) => (
				<RequestCard key={request.id} {...request} isButtonVisible={false} />
			)),
		[requestDashboard]
	);

	return (
		<Layout title={"DashBoard"}>
			<main className="w-full p-5 md:p-20">
				<ProfileCard />
				<hr className="my-5 border-black" />
				<CardDisclosure
					title={"Booking"}
					href={"/user/booking"}
					element={bookElements}
				/>
				<hr className="my-5 border-black" />
				<CardDisclosure
					title={"Requests"}
					href={"/user/request"}
					element={requestElement}
				/>
			</main>
		</Layout>
	);
};

export default User;
