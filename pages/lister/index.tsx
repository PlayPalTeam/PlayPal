import Navbar from "../../components/Navbar";
import { useTurfContext } from "../../context/TurfContext";

const Lister = () => {
	const { TurfData } = useTurfContext();
	console.log(TurfData);
	return (
		<>
			<div className="flex">
				<Navbar />
				<div className="grid">
					
				</div>
			</div>
		</>
	);
};

export default Lister;
