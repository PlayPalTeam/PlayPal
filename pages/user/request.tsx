import { useState } from "react";
import { Layout, RequestCard, RequestForm } from "../../src/components";
import useHelper from "../../src/utils/helper";

const Request = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { cardsData } = useHelper();

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
					<RequestForm closeModal={closeModal} isOpen={isOpen} />
				</section>
				<section className="mt-5">
					<div className="space-y-5">
						{cardsData.map((cardData) => (
							<RequestCard
								key={cardData.id}
								id={cardData.id}
								profile_id={cardData.profile_id}
								game={cardData.game}
								player_needed={cardData.player_needed}
								date={cardData.date}
								book={cardData.book}
							/>
						))}
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default Request;
