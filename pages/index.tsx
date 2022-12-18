import Navbar from "../components/Navbar";
import Link from "next/link";

const Home = () => {
	return (
		<div className="flex items-center justify-between">
			<Navbar />
			<Link
				className="rounded-md bg-green-600 p-2 text-white"
				href={"/auth/signup"}
			>
				Sign Up
			</Link>
		</div>
	);
};
export default Home;
