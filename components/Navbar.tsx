import { useState } from "react";
import {
	BsGrid3X3GapFill,
	BsArrowLeftRight,
	BsCollectionFill,
	BsPeopleFill,
	BsMessenger,
	BsCone,
	BsFolderFill,
	BsDot,
} from "react-icons/bs";

const NavBarList = [
	{ icons: <BsDot /> },
	{
		text: "My DashBoard",
		icons: <BsGrid3X3GapFill />,
	},
	{
		text: "My Course",
		icons: <BsCollectionFill />,
	},
	{
		text: "My Group",
		icons: <BsPeopleFill />,
	},
	{
		text: "My Message",
		icons: <BsMessenger />,
	},
	{
		text: "My Connections",
		icons: <BsCone />,
	},
	{
		text: "My Forums",
		icons: <BsFolderFill />,
	},
];

const Navbar = () => {
	const [nav, setNav] = useState(true);

	function navclick() {
		setNav((prevState) => !prevState);
	}

	return (
		<>
			{nav ? (
				<nav className="h-[100vh] w-72 bg-green-500 p-6 text-white ">
					<div className=" mb-10 flex justify-between">
						<h1>logo</h1>
						<button onClick={navclick}>
							<BsArrowLeftRight />
						</button>
					</div>
					<div className="mb-7 text-xs">MY CERA</div>
					<ul>
						{NavBarList.slice(1).map((nav, index) => (
							<li key={index} className="mb-6 flex items-center">
								{nav.icons}
								<p className="ml-3">{nav.text}</p>
							</li>
						))}
					</ul>
				</nav>
			) : (
				<div className=" nav h-[100vh] w-16 bg-green-500 p-6  pt-7  text-white">
					<button onClick={navclick} className="mb-12">
						<BsArrowLeftRight />
					</button>
					<ul>
						{NavBarList.map((nav, index) => (
							<li key={index} className="mb-8 flex items-center">
								{nav.icons}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default Navbar;
