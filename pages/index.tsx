import { BsPersonSquare } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const displayData = [
	{
		img: "",
		name: "Search",
		text: "Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the India",
	},
	{
		img: "",
		name: "Book",
		text: "Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment",
	},
	{
		img: "",
		name: "Play",
		text: "You’re the hero, you’ve found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.",
	},
];

const Home = () => {
	const [colour, setColour] = useState(false);

	useEffect(() => {
		const changeColour = () => {
			if (window.scrollY >= 200) {
				setColour(true);
			} else {
				setColour(false);
			}
		};

		window.addEventListener("scroll", changeColour);
	}, []);
	
	return (
		<>
			<div>
				{colour ? (
					<div className="sticky top-0 z-[1] flex justify-between bg-green-500 p-4 pl-32 pr-32 font-bold tracking-wider text-white brightness-[0.9] transition-all duration-700 ease-in-out">
						<div>PlayPal</div>
						<div className="flex items-center gap-4">
							<BsPersonSquare />
							Contact
						</div>
					</div>
				) : (
					<div className="sticky top-0 flex justify-between p-4 pl-32 pr-32 font-bold tracking-wider text-white">
						<div>PlayPal</div>
						<div className="flex items-center gap-4">
							<BsPersonSquare />
							Contact
						</div>
					</div>
				)}
				<div className="absolute top-0 z-[-1]  ">
					<video
						autoPlay
						muted
						loop
						className="h-[100vh] w-[100vw] object-cover brightness-[0.8]"
					>
						<source
							src="https://www.playspots.in/wp-content/themes/playspots/assets/videos/beach-soccer.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
				<div className="absolute top-[25%] left-[15%] text-white">
					<div className="text-7xl font-bold tracking-widest ">
						YOUR <br></br>NEAREST <br></br>TURF <br></br>
					</div>

					<div className="mt-4 text-2xl font-semibold tracking-widest text-green-500">
						IS JUST A TAP AWAY
					</div>
					<div className="mt-4 flex w-[170px] justify-center rounded-full bg-green-500 p-2 pl-4 pr-4 text-white">
						<Link href={"/auth/signin"}>Start Your Search</Link>
					</div>
				</div>

				<div className="mt-[90vh] p-4 h-[400px] flex justify-center">
					<div className="flex justify-around gap-4  pl-10 pr-10 m-auto ">
						{displayData.map((data, index) => (
							<div
								key={index}
								className=""
							>
								<div className=" flex justify-center">
									<Image src={data.img} alt="img" />
								</div>
								<div className="flex justify-center mt-3 font-medium text-lg tracking-wider">{data.name}</div>
								<div className="flex justify-center text-center mt-3">
									{data.text}
								</div>
							</div>
						))}
					</div>
				</div>
				thi				
			</div>
		</>
	);
};
export default Home;
