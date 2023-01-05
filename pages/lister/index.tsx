import Head from "next/head";
import Link from "next/link";
import Navbar from "../../src/components/Navbar";
import TurfCard from "../../src/components/TurfCard";
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
				<div className="w-full p-10">
					<h2>Profile Card</h2>
					{/* Profile Card */}
					<hr />
					<h2>Turfs</h2>
					<Link href={"/lister/turf"}>Add</Link>
					{turfs.map((turf) => (
						<div key={turf.turf_id}>
							<TurfCard {...turf} />
						</div>
					))}
				</div>
			</div>
			
		</>
	);
};

export default Lister;
