import Link from "next/link";

const Home = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="rounded-md bg-green-600 p-2 text-white">
				<Link href={"/auth/signup"}>Sign Up</Link>
			</div>
		</div>
	);
};

export default Home;
