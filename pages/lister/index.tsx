import Navbar from "../../components/Navbar";
import { useTurfData } from "../../context/TurfContext";

const Lister = () => {

	const { turfData }=  useTurfData()
	console.log(turfData)

	return (
		<div>
			<Navbar />
		</div>
	);
};

export default Lister;
