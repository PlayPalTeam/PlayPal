import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import {
	BsGrid3X3GapFill,
	BsCollectionFill,
	BsPeopleFill,
	BsMessenger,
	BsLockFill,
	BsList,
} from "react-icons/bs";

import { useUserProfile } from "../context/UserProfileContext";
import Avatar from "./Avatar";

const Navbar = () => {
	const router = useRouter();

	const { userProfile } = useUserProfile();

	const { username, avatar_url } = userProfile;

	const supabase = useSupabaseClient();

	const user = useUser();

	const role = user?.user_metadata.role;

	const handleLogOut = async () => {
		await supabase.auth.signOut();
		Cookies.remove("supabase-auth-token");
		router.push("/auth/signin");
	};

	const [navChange, setNavChange] = useState(false);

	const respnav = () => {
		setNavChange((prevState) => !prevState);
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
		},
	];

	return (
		<>
			<nav
				// max-md:hidden
				className={`hidden w-72 bg-green-500 text-white sm:sticky sm:top-0  sm:block sm:h-screen sm:min-w-[290px] sm:max-w-[290x] `}
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

			<div className="sticky top-0 h-screen bg-green-400 sm:hidden">
				<div className="mt-4 p-2">
					<button onClick={respnav}>
						{" "}
						<BsList size={27} />
					</button>
					<div className="mt-14 flex flex-col gap-16">
						<BsGrid3X3GapFill size={27} />
						<BsCollectionFill size={27} />
						<BsPeopleFill size={27} />
						<BsMessenger size={27} />
						<BsPeopleFill size={27} />
						<BsLockFill size={27} />
					</div>
				</div>
				{navChange && (
					<div className="fixed top-0 left-10 z-[10] h-screen w-screen  bg-green-400  pt-28 transition duration-1000  ease-in">
						{NavBarList.map((nav, index) => (
							<li
								key={index}
								className="items-left flex px-2 pb-[59px] hover:bg-green-700"
							>
								{}
								<Link
									href={
										role === "user"
											? `/user/${nav.link}`
											: `/lister/${nav.link}`
									}
								>
									<p className="text-2xl">{nav.text}</p>
								</Link>
							</li>
						))}
						<button className="ml-3 text-2xl" onClick={handleLogOut}>
							Log Out
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default memo(Navbar);
