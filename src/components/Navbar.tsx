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
	BsLockFill,
	
} from "react-icons/bs";

import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";
import { useUserProfile } from "../context/UserProfileContext";
import Avatar from "./Avatar";

const Navbar = () => {
	const router = useRouter();

	const { userProfile } = useUserProfile();

	const { username , avatar_url } = userProfile;

	

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
			text: "Add Turfs",
			link: "turf",
			icons: <BsPeopleFill />,
		},
		{
			text: "Community",
			link: "community",
			icons: <BsMessenger />,
		}
	
	];

	return (
		<nav
			className={`sticky top-0 h-screen w-72 bg-green-500 text-white max-md:hidden sm:min-w-[290px] sm:max-w-[290x]`}
		>
			<div className=" mt-10 flex justify-between ">
			<Avatar uid={user?.id} size={100} url={avatar_url} navs={false} />
			</div>
			<div className=" mb-7 flex justify-center text-lg">
				<p>{username}</p>
			</div>
			<ul>
				{NavBarList.map((nav, index) => (
					<li
						key={index}
						className="flex items-center py-3 px-10 hover:bg-green-700"
					>
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
				<li className="flex items-center px-10 py-3 hover:bg-green-700">
					<BsLockFill />
					<button className="ml-3" onClick={handleLogOut}>
						Log Out
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default memo(Navbar);
