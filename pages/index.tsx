import Navbar from "../components/Navbar";
import Link from "next/link";

const Home = () => {
	return (
		<div className="flex justify-between items-center">
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
