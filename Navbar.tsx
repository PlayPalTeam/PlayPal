import React from "react";
import Image from "next/image";
import logo from "../public/logo.svg";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsArrowLeftRight } from "react-icons/bs";
import { BsCollectionFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { BsFolderFill } from "react-icons/bs";
import { BsCone } from "react-icons/bs";
import { BsDot } from "react-icons/bs";

const Navbar = () => {
	const [nav, setNav] = React.useState(true);
	function navclick() {
		setNav((prevState) => !prevState);
	}

	return (
		<>
			{nav ? (
				<nav className="h-[100vh] w-72 bg-green-500 p-6 text-white ">
					<div className=" mb-10 flex justify-between">
						{/* <Image 
      src={logo}
      alt="logo"
      width={400}
      /> */}
						<h1>logo</h1>
						<button onClick={navclick}>
							<BsArrowLeftRight />
						</button>
					</div>

					<div className="mb-7 text-xs">MY CERA</div>
					<ul>
						<li className="mb-6 flex items-center">
							{" "}
							<BsGrid3X3GapFill />
							<h1 className="ml-3 ">My Dashboard</h1>
						</li>
						<li className="mb-6 flex items-center">
							{" "}
							<BsCollectionFill />
							<h1 className="ml-3 ">My Course</h1>
						</li>
						<li className="mb-6 flex items-center">
							{" "}
							<BsPeopleFill />
							<h1 className="ml-3 ">My Groups</h1>
						</li>
						<li className="mb-6 flex items-center">
							{" "}
							<BsMessenger />
							<h1 className="ml-3 ">My Messages</h1>
						</li>
						<li className="mb-6 flex items-center">
							{" "}
							<BsCone />
							<h1 className="ml-3 ">My Connections</h1>
						</li>
						<li className="mb-6 flex items-center">
							{" "}
							<BsFolderFill />
							<h1 className="ml-3 ">My Forums</h1>
						</li>
					</ul>
					<div className="text-xs ">Who is Online</div>
					<p className="mt-4 ml-2 text-xs">
						There are currently no users online
					</p>
				</nav>
			) : (
				<div className=" nav h-[100vh] w-16 bg-green-500 p-6  pt-7  text-white">
					<button onClick={navclick} className="mb-12">
						<BsArrowLeftRight />
					</button>
					<ul>
						<li className="mb-8 flex items-center">
							{" "}
							<BsDot />
						</li>
						<li className="mb-8 flex items-center">
							{" "}
							<BsGrid3X3GapFill />
						</li>
						<li className="mb-8 flex items-center">
							{" "}
							<BsCollectionFill />
						</li>
						<li className="mb-8 flex items-center">
							{" "}
							<BsPeopleFill />
						</li>
						<li className="mb-8 flex items-center">
							{" "}
							<BsMessenger />
						</li>
						<li className="mb-8 flex items-center">
							{" "}
							<BsCone />
						</li>
						<li className="mb-8 flex items-center">
							{" "}
							<BsFolderFill />
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default Navbar;
