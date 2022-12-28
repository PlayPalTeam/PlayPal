import React from "react";
import {
	BsInstagram,
	BsTwitter,
	BsTwitch,
	BsFacebook,
	BsYoutube,
} from "react-icons/bs";

const Footer = () => {
	return (
		<>
			<div className="bg-green-400">
				<div className="sm:ml-24 sm:mr-24 sm:h-[270px] h-[200px]">
					<div className="flex justify-between sm:pt-16 sm:pl-32 sm:pr-32 pt-10 pr-4 items-center">
						<h1 className="text-2xl  font-semibold tracking-widest">PLAYPAL</h1>
						<ul className="flex sm:gap-4 gap-3 ">
							<li className="">
								<BsInstagram size={25} />
							</li>
							<li>
								<BsFacebook size={25} />
							</li>
							<li>
								<BsTwitter size={25} />
							</li>
							<li>
								<BsTwitch size={25} />
							</li>
							<li>
								<BsYoutube size={25} />
							</li>
						</ul>
					</div>

					<div className="flex justify-between pt-8 sm:pt-16 sm:pl-32 sm:pr-32 gap-16 sm:gap-0">
						<div className="flex sm:gap-16 gap-6 ">
							<h1>Privacy</h1>
							<h1>Policy</h1>
						</div>
						<ul className="flex sm:gap-4 sm:flex-nowrap flex-wrap gap-2 gap-x-12  ">
							<li>Home</li>
							<li>Blog</li>
							<li>About</li>
							<li>Contact</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
