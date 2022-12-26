import { BsPersonSquare } from "react-icons/bs";
const Links = [
	{
		text: "User",
		href: "/auth/signin",
	},
	{
		text: "List you place",
		href: "/auth/signin",
	},
];

import Link from "next/link";

const Home = () => {
	return (
		<>
			<div>
				<div className="ml-16 mr-16 flex justify-between p-8 ">
					<div>PlayPal</div>
					<div className="flex items-center gap-2">
						<BsPersonSquare />
						Contact
					</div>
				</div>
				<div className="absolute top-0 z-[-1]">
					<video autoPlay muted loop>
						<source
							src="https://www.playspots.in/wp-content/themes/playspots/assets/videos/beach-soccer.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
			</div>
			{/* <div className="flex gap-x-5">
				{Links.map((link, index) => (
					<Link key={index} href={link.href}>
						<p className="rounded-xl bg-red-200 p-5 text-2xl font-semibold duration-300 ease-linear hover:bg-red-500 hover:text-white">
							{link.text}
						</p>
					</Link>
				))}
			</div> */}
		</>
	);
};
export default Home;
