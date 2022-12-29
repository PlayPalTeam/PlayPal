import Head from "next/head";
import { useReducer, useMemo, useCallback } from "react";
import { ChangePassword, Navbar, Profile } from "../../components";

const ListerProfile = () => {
	// Initialize state variable to store the component to display
	const [toggle, dispatch] = useReducer(
		(state: string, action: string) => action,
		"Account Settings"
	);

	// Create a memoized version of the profilesettings array
	const profilesettings = useMemo(
		() => [
			{
				name: "Account Settings",
				info: "Details about your personal information",
			},
			{
				name: "Password and Security",
				info: "Details about your personal information",
			},
		],
		[]
	);

	const decide = (name: string) => {
		dispatch(name);
	};

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<main className="flex">
				<Navbar />
				<section className="flex flex-wrap gap-10 p-12">
					<div className="grow p-2">
						{profilesettings.map((data, index) => (
							<button
								key={index}
								onClick={() => decide(data.name)}
								className="group m-5 flex flex-col rounded-md border border-green-500 p-3 pt-2 transition-colors duration-300 ease-in hover:bg-green-500"
							>
								<p className="transition-colors ease-in group-hover:text-white">
									{data.name}
								</p>
								<p className="text-xs transition-colors ease-in  group-hover:text-white">
									{data.info}{" "}
								</p>
							</button>
						))}
					</div>
					<div className="opacity-100 transition-all duration-300 ease-in-out">
						{toggle === "Account Settings" && <Profile />}
						{toggle === "Password and Security" && <ChangePassword />}
					</div>
				</section>
			</main>
		</>
	);
};

export default ListerProfile;
