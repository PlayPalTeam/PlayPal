import Head from "next/head";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { Navbar, ProfileCard } from "../../src/components";

const User = () => {
	return (
		<>
			<Head>
				<title>PlayPal | User - Dashboard</title>
			</Head>
			<main className="flex">
				<Navbar />
				<section className="w-full p-20">
					<div>
						<ProfileCard />
						<hr className="my-5" />
						<Link
							className="float-right flex w-max items-center justify-end gap-x-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out hover:bg-green-600"
							href={"/user/booking"}
						>
							<p>Book Turf</p>
							<AiOutlinePlus />
						</Link>
					</div>
				</section>
			</main>
		</>
	);
};

export default User;
