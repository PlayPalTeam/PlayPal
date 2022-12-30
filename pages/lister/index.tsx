import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useTurfContext } from "../../context/TurfContext";

const Lister = () => {
	const { TurfData } = useTurfContext();
	console.log(TurfData);
	return (
		<>
			<Head>
				<title>PlayPal | Dashboard</title>
			</Head>
			<div className="flex">
				<Navbar />
				<div className="grid"></div>
			</div>
		</>
	);
};

export default Lister;
