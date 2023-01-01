import Head from "next/head";
import Navbar from "../../src/components/Navbar";
import { useTurfContext } from "../../src/context/TurfContext";

const Lister = () => {
	const { turfs } = useTurfContext();
	return (
		<>
			<Head>
				<title>PlayPal | Dashboard</title>
			</Head>
			<div className="flex">
				<Navbar />
				<div></div>
			</div>
		</>
	);
};

export default Lister;
