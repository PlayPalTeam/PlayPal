import { useState } from "react";
import { useBookContext } from "../../src/context/BookingContext";
import { useRequestContext } from "../../src/context/RequestContext";
import { useUserProfile } from "../../src/context/UserProfileContext";
import useHelper from "../../src/utils/helper";
import dynamic from 'next/dynamic'
import { Database } from "../../src/types/database.types";
import { Layout } from "@components/index";


type Request = Database["public"]["Tables"]["requests"]["Row"]


const Card = dynamic(() => import("../../src/components/RequestCard"), {
	loading: () => {
		return (
			<p>Loading...</p>
		)
	},
})

const Form = dynamic(() => import("../../src/components/RequestForm"))

const Request = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { userProfile } = useUserProfile();
	const { requests } = useRequestContext();
	const { books } = useBookContext();

	const { RequestMappedData } = useHelper();


	const requestCardsData = RequestMappedData(
		requests,
		books,
		(req: Request) => !userProfile.request?.some((id) => id === req.id.toString())
	);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<Layout title={"Request"}>
			<main className="flex w-full flex-col p-5 md:p-20">
				<section>
					<button
						type="button"
						onClick={openModal}
						className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>
						Create Request
					</button>
					<Form closeModal={closeModal} isOpen={isOpen} />
				</section>
				<section className="mt-5">
					<div className="space-y-5">
						{requestCardsData.map((cardData) => (
							<Card
								key={cardData.id}
								{...cardData}
							/>
						))}
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default Request;

