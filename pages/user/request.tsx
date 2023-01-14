import { useState } from "react";
import { Layout, RequestCard, RequestForm } from "../../src/components";
import { useBookContext } from "../../src/context/BookingContext";
import { useRequestContext } from "../../src/context/RequestContext";

const Request = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { requests } = useRequestContext();
	const { books } = useBookContext();

	const cardsData = requests.map((request) => {
		const matchingBooks = books.filter(
			(book) =>
				book.turf_id === request.turf_id && book.date === request.game_date
		);
		return {
			id: request.request_id,
			game: request.game,
			player_needed: request.player_needed,
			date: request.game_date,
			book: matchingBooks.map((book) => ({
				start_time: book.start_time,
				end_time: book.end_time,
				turfs: {
					turf_name: book.turfs.turf_name,
					location: book.turfs.location,
				},
			})),
		};
	});

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<Layout title={"Request"}>
			<main className="flex w-full flex-col p-20">
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
