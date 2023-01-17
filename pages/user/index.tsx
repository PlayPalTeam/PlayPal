import { useBookContext } from "../../src/context/BookingContext";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CardDisclosure, Layout } from "../../src/components";
import useHelper from "../../src/utils/helper";

const ProfileCard = dynamic(() => import("../../src/components/ProfileCard"));
const BookingCard = dynamic(() => import("../../src/components/BookingCard"));
const RequestCard = dynamic(() => import("../../src/components/RequestCard"));

/**
 * This is the main component for the user dashboard, it is responsible for rendering the user's profile card, bookings, and requests.
 * It uses the useBookContext hook to access the state of the books, and the useHelper hook to access the requestDashboard state.
 * It also uses the useMemo hook to memoize the book and request elements to prevent unnecessary re-renders.
 * It renders the elements inside of CardDisclosure components which will display the element passed to it and provides a button to navigate to a specified href.
 * It is wrapped in a Layout component which provides a basic structure for the page, and sets the title of the page.
 * It renders the ProfileCard, BookingCard and RequestCard components with the data passed as props.
 * */
const User = () => {
	const { books } = useBookContext();
	const { requestDashboard, cardsData } = useHelper();

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

	const requestCardData = useMemo(
		() =>
			cardsData.map((req) => (
				<RequestCard key={req.id} {...req} isButtonVisible={false} />
			)),
		[cardsData]
	);

	return (
		<Layout title={"DashBoard"}>
			<main className="w-full p-5 md:p-20">
				<ProfileCard />
				<hr className="my-5 border-black" />
				<CardDisclosure title={"Bookings"} element={bookElements} />
				<hr className="my-5 border-black" />
				<CardDisclosure
					title={"Request you have created"}
					element={requestCardData}
				/>
				<hr className="my-5 border-black" />
				<CardDisclosure
					title={"Request you have accepted"}
					element={requestElement}
				/>
			</main>
		</Layout>
	);
};

export default User;
