import Link from "next/link";

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

const Home = () => {
	return (
		<div className="flex h-screen items-center justify-center bg-fuchsia-200">
			<div className="flex gap-x-5">
				{Links.map((link, index) => (
					<Link key={index} href={link.href}>
						<p className="rounded-xl bg-red-200 p-5 text-2xl font-semibold duration-300 ease-linear hover:bg-red-500 hover:text-white">
							{link.text}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};
export default Home;
