import Image from "next/image";
import {
	BsInstagram,
	BsTwitter,
	BsTwitch,
	BsFacebook,
	BsYoutube,
} from "react-icons/bs";

const socialLinks = [
	{
		icon: BsInstagram,
		name: "Instagram",
	},
	{
		icon: BsFacebook,
		name: "Facebook",
	},
	{
		icon: BsTwitter,
		name: "Twitter",
	},
	{
		icon: BsTwitch,
		name: "Twitch",
	},
	{
		icon: BsYoutube,
		name: "YouTube",
	},
];

const pageLinks = ["Home", "Blog", "About", "Contact"];

const Footer = () => {
	return (
		<div className="bg-green-400 py-12 sm:py-16">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center justify-between py-4 sm:py-8">
					<h1 className="text-lg-semibold">PLAYPAL</h1>
					<Image
						className="mix-blend-color-burn max-md:hidden"
						src="/playpal-high-resolution-color-logo.svg"
						alt=""
						width={200}
						height={200}
					/>

					<div className="inline-flex gap-4">
						{socialLinks.map((link) => (
							<span key={link.name}>
								<link.icon size={25} />
							</span>
						))}
					</div>
				</div>
				<div className="flex justify-between gap-12 py-4 sm:gap-0 sm:py-8">
					<div className="inline-flex gap-4 sm:gap-12">
						<p>Privacy</p>
						<p>Policy</p>
					</div>
					<div className="inline-flex gap-2 sm:gap-12">
						{pageLinks.map((link) => (
							<span key={link}>{link}</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
