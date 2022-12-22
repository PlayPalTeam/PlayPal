import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import {
	BsGrid3X3GapFill,
	BsCollectionFill,
	BsPeopleFill,
	BsMessenger,
} from "react-icons/bs";

const NavBarList = [
	{
		text: "Profile",
		link: "profile",
		icons: <BsGrid3X3GapFill />,
	},
	{
		text: "Requests",
		link: "request",
		icons: <BsCollectionFill />,
	},
	{
		text: "Turfs Booking",
		link: "booking",
		icons: <BsPeopleFill />,
	},
	{
		text: "Community",
		link: "community",
		icons: <BsMessenger />,
	},
];

const Navbar = () => {
	const router = useRouter();

	const supabase = useSupabaseClient();

	const user = useUser();

	const role = user?.user_metadata.role;

	const handleLogOut = async () => {
		await supabase.auth.signOut();
		Cookies.remove("supabase-auth-token");
		router.push("/auth/signin");
	};

	return (
		<nav className="sticky top-0 h-screen w-72 bg-green-500 p-6 text-white ">
			<div className="mb-10 flex justify-between">
				<h1>logo</h1>
			</div>
			<div className="mb-7 text-xs">MY CERA</div>
			<ul>
				{NavBarList.map((nav, index) => (
					<li key={index} className="mb-6 flex items-center">
						{nav.icons}
						<Link
							href={
								role === "user" ? `/user/${nav.link}` : `/lister/${nav.link}`
							}
						>
							<p className="ml-3">{nav.text}</p>
						</Link>
					</li>
				))}
			</ul>
			<button onClick={handleLogOut}>Log Out</button>
		</nav>
	);
};

export default memo(Navbar);
