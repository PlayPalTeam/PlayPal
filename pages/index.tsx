import { BsPersonSquare } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
	useEffect(() => {
		const changeColour = () => {
			const header = document.querySelector(".header");
			if (window.scrollY >= 20) {
				header.classList.add("fixed-landing");
			} else {
				header.classList.remove("fixed-landing");
			}
		};

		window.addEventListener("scroll", changeColour);
	}, []);

	return (
		<>
			<div>
				<div className="header z-10 flex justify-between p-3 pl-5 pr-5 font-bold tracking-wider text-white transition-all ease-in-out sm:p-4 sm:pl-32 sm:pr-32 sm:duration-700">
					<div>PlayPal</div>
					<div className="flex items-center gap-4">
						<BsPersonSquare />
						Contact
					</div>
				</div>
				<div className="absolute top-0 -z-10">
					<video
						autoPlay
						muted
						loop
						className="h-[630px] w-screen object-cover brightness-[0.8] sm:h-screen"
					>
						<source
							src="https://www.playspots.in/wp-content/themes/playspots/assets/videos/beach-soccer.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
				<div className="absolute top-[25%] left-[15%] text-white">
					<div className="text-2xl font-bold tracking-widest sm:text-7xl ">
						YOUR <br></br>NEAREST <br></br>TURF <br></br>
					</div>

					<div className="text-md mt-4 font-semibold tracking-widest text-green-500 sm:text-2xl">
						IS JUST A TAP AWAY
					</div>
					<div className="mt-4 flex w-[170px] justify-center rounded-full bg-green-500 p-2 pl-4 pr-4 text-white">
						<Link href={"/auth/signin"}>Start Your Search</Link>
					</div>
				</div>

				<div className="mt-[90vh] flex justify-center p-4 sm:h-[500px] ">
					<div className="mb-16 flex justify-around gap-10 max-sm:flex-wrap sm:m-auto sm:pl-14 sm:pr-14 ">
						{displayData.map((data, index) => (
							<div key={index} className="">
								<div className="flex justify-center">
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

				<div className="flex h-[500px] items-center justify-around bg-purple-100 max-sm:flex-wrap sm:h-[600px]  sm:justify-between sm:gap-16">
					<div className="ml-8 sm:ml-24 sm:grow-[1]">
						<div className=" font-bold tracking-widest sm:text-5xl ">
							MUCH SPORTS <br></br> ADD IN YOUR <br /> DAILY LIFE
						</div>
						<p className="mt-5 tracking-wider">
							PlayPal is an online platform to connect sports facilities to its
							users, We&apos;re breaking down <br></br> barriers to getting more
							people active
						</p>
					</div>
					<div className="sm:mr-24 sm:grow-[1]">
						<Image
							src="/offer.jpeg"
							alt="offerImage"
							width={300}
							height={300}
						/>
					</div>
				</div>

				<div className="flex h-[650px] items-center justify-around bg-[#060b1e] text-white max-sm:flex-wrap sm:h-[600px]  sm:justify-between sm:gap-16 ">
					<div className="ml-8 sm:ml-32 sm:grow-[1]">
						<div className=" font-bold tracking-widest sm:text-5xl ">
							MEET YOUR PALS<br></br> OVER GAME <br />
						</div>
						<p className="mt-5 tracking-wider">
							Want to play games ? <br></br>
							But don&apos;t get an opponent team?<br></br>
							You can Invite a team or Join a pre scheduled match Through
							Playspots
						</p>
					</div>
					<div className="sm:mr-24 sm:grow-[1] ">
						<Image
							src="/meetpals.png"
							alt="offerImage"
							width={300}
							height={300}
						/>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};
export default Home;
