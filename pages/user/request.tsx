import { useState } from "react";
import { Layout, RequestForm } from "../../src/components";
import { useRequestContext } from "../../src/context/RequestContext";

const Request = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { requests } = useRequestContext();

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<Layout title={"Request"}>
			<main className="p-10">
				<section>
					<button
						type="button"
						onClick={openModal}
						className="rounded-md bg-green-500  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>
						Create Request
					</button>
					<RequestForm closeModal={closeModal} isOpen={isOpen} />
				</section>
				<section>
					<div>
						{requests.map((request) => (
							<div key={request.id}>
								<p>{request.player_needed}</p>
							</div>
						))}
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default Request;
