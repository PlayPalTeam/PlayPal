import { useBookContext } from "../../src/context/BookingContext";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import useHelper from "../../src/utils/helper";
import { useRequestContext } from "../../src/context/RequestContext";
import { Database } from "../../src/types/database.types";
import { useUserProfile } from "../../src/context/UserProfileContext";
import { CardDisclosure, Layout } from "@components/index";

const ProfileCard = dynamic(() => import("../../src/components/ProfileCard"));
const BookingCard = dynamic(() => import("../../src/components/BookingCard"));
const RequestCard = dynamic(() => import("../../src/components/RequestCard"));

type Request = Database["public"]["Tables"]["requests"]["Row"];

const User = () => {
	const { userProfile } = useUserProfile();
	const { requests } = useRequestContext();
	const { books } = useBookContext();
	const { RequestMappedData } = useHelper();

	const requestCreatedByYou = RequestMappedData(
		requests,
		books,
		(req: Request) => req.profile_id === userProfile.id
	);

	const requestAcceptedByYou = RequestMappedData(
		requests,
		books,
		(req: Request) =>
			userProfile.request?.some((id) => id === req.id.toString())
	);

	// useMemo to memoize the book elements so that it is not recreated on every render
	const bookElements = useMemo(
		() => books.map((book) => <BookingCard key={book.booking_id} {...book} />),
		[books]
	);

	const requestCreatedElement = useMemo(
		() =>
			requestCreatedByYou.map((request) => (
				<RequestCard key={request.id} {...request} />
			)),
		[requestCreatedByYou]
	);

	const requestAcceptedElement = useMemo(
		() =>
			requestAcceptedByYou.map((request) => (
				<RequestCard key={request.id} {...request} isButtonVisible={false} />
			)),
		[requestAcceptedByYou]
	);

	return (
		<Layout title={"DashBoard"}>
			<main className="w-full max-w-5xl mx-auto py-20 max-md:p-5">
				<ProfileCard />
				<hr className="my-5 border-black" />
				<CardDisclosure title={"Bookings"} element={bookElements} />
				<hr className="my-5 border-black" />
				<CardDisclosure
					title={"Request created by you"}
					element={requestCreatedElement}
				/>
				<hr className="my-5 border-black" />
				<CardDisclosure
					title="Request you accepted"
					element={requestAcceptedElement}
				/>
			</main>
		</Layout>
	);
};

export default User;
