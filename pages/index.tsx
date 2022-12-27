import { BsPersonSquare } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import offer from "../public/offer.jpeg";
import { Footer } from "../components";

const displayData = [
	{
		img: "/search.png",
		name: "Search",
		text: "Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the India",
	},
	{
		img: "/book.png",
		name: "Book",
		text: "Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment",
	},
	{
		img: "/play.png",
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
					<div className="sticky top-0 z-[1] flex justify-between bg-green-400 p-4 pl-32 pr-32 font-bold tracking-wider text-white  transition-all duration-700 ease-in-out">
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

				<div className="mt-[90vh] flex h-[500px] justify-center p-4">
					<div className="m-auto flex justify-around gap-6 pl-14 pr-14 ">
						{displayData.map((data, index) => (
							<div key={index} className="">
								<div className=" flex justify-center">
									<Image src={data.img} alt="img" width={40} height={40} />
								</div>
								<div className="mt-3 flex justify-center text-lg font-medium tracking-wider">
									{data.name}
								</div>
								<div className="mt-3 flex justify-center text-center">
									{data.text}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className=" flex h-[650px] items-center justify-between gap-16 bg-purple-100">
					<div className="ml-24 grow-[1]">
						<div className=" text-5xl font-bold tracking-widest ">
							MUCH SPORTS <br></br> ADD IN YOUR <br /> DAILY LIFE
						</div>
						<p className="mt-5 tracking-wider">
							PlayPal is an online platform to connect sports facilities to its
							users, We&apos;re breaking down <br></br> barriers to getting more
							people active
						</p>
					</div>
					<div className="mr-24 grow-[1] ">
						<Image src={offer} alt="offerImage" width={350} height={350} />
					</div>
				</div>

				<div className="flex h-[800px] items-center justify-between gap-16 bg-[#060b1e] text-white ">
					<div className="ml-24 grow-[1]">
						<div className=" text-5xl font-bold tracking-widest ">
							MEET YOUR PALS<br></br> OVER GAME <br />
						</div>
						<p className="mt-5 tracking-wider">
							Want to play games ? <br></br>
							But don&apos;t get an opponent team?<br></br>
							You can Invite a team or Join a pre scheduled match Through
							Playspots
						</p>
					</div>
					<div className="mr-24 grow-[1] ">
						<Image
							src="/meetpals.png"
							alt="offerImage"
							width={350}
							height={350}
						/>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};
export default Home;
