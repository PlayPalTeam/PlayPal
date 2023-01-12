import { useReducer, useMemo } from "react";
import { ChangePassword, Layout, Profile } from "../../src/components";

const ListerProfile = () => {
	const [toggle, dispatch] = useReducer(
		(state, action) => action,
		"Account Settings"
	);

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

	const handleToggle = (name: string) => {
		dispatch(name);
	};

	return (
		<Layout title={"Profile"}>
			<section className="flex flex-wrap gap-10 p-12">
				<div className="grow p-2">
					{profilesettings.map((data, index) => (
						<button
							key={index}
							onClick={() => handleToggle(data.name)}
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
		</Layout>
	);
};

export default ListerProfile;
