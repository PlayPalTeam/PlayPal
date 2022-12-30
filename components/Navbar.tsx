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

import { AiOutlineLogout } from "react-icons/ai";
import { useUserProfile } from "../context/UserProfileContext";
import Image from "next/image";

const Navbar = () => {
	const router = useRouter();

	const { userProfile } = useUserProfile();

	const { username } = userProfile;

	const supabase = useSupabaseClient();

	const user = useUser();

	const role = user?.user_metadata.role;

	const handleLogOut = async () => {
		await supabase.auth.signOut();
		Cookies.remove("supabase-auth-token");
		router.push("/auth/signin");
	};

	const NavBarList = [
		{
			text: "Dashboard",
			link: "",
			icons: <BsGrid3X3GapFill />,
		},
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
			text: role === "user" ? "Turfs" : "Add Turfs",
			link: "turf",
			icons: <BsPeopleFill />,
		},
		{
			text: "Community",
			link: "community",
			icons: <BsMessenger />,
		},
	];

	return (
		<nav
			className={`sticky top-0 h-screen w-72 bg-green-500 p-6 text-white`}
		>
			<div className="mb-10 flex justify-between mix-blend-color-burn">
				<Image
					src="/playpal-high-resolution-color-logo.svg"
					alt="Logo"
					width={1000}
					height={1000}
				/>
			</div>
			<div className="mb-7 text-xs">
				<p>{username}</p>
			</div>
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
				<li className="mb-6 flex items-center">
					<AiOutlineLogout />
					<button className="ml-3" onClick={handleLogOut}>
						Log Out
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default memo(Navbar);
