import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema, UserProfileType } from "../../types/types";
import { useUserProfile } from "../../context/UserProfileContext";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";

const profilesettings = [
	{
		name: "Account Settings",
		info: "Details about your personal information",
	},
	{
		name: "Password and Security",
		info: "Details about your personal information",
	},
];

const UserProfile = () => {
	const { userProfile } = useUserProfile();

	const session = useSession();

	const { username, full_name } = userProfile;

	const { register, reset } = useForm<UserProfileType>({
		resolver: zodResolver(UserProfileSchema),
	});

	function decide() {
		console.log("few");
	}

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<div className="flex">
				<Navbar />
				<div className="flex w-screen gap-10 p-12 ">
					{/* main 1 */}
					<div className="grow-[1]">
						<div className="p-2">
							{profilesettings.map((data, index) => (
								<div
									key={index}
									className="m-5 flex flex-col items-start rounded-md border border-green-500 p-3 pt-2"
								>
									<button onClick={decide}>{data.name}</button>
									<div className="text-xs">{data.info} </div>
								</div>
							))}
						</div>
					</div>
					{/* main 2 */}
					<div className="mr-14 grow-[4]">
						<div className="flex gap-2 rounded-md border border-green-500 p-12 pl-14">
							<div className="m-auto ml-14 grow-[2] ">
								<div>Upload a new Photo</div>
								<div>Image name </div>
							</div>
							<div className=" m-auto mr-4 grow-[1]">
								<button className="ml-3 rounded-lg border border-green-500 p-2 pl-4 pr-4">
									Update
								</button>
							</div>
						</div>

						<div className="mt-5 rounded-md border border-green-500 p-12 pt-2">
							<div className="mt-3">
								<div className="mb-5 text-lg ">
									Change User Information here
								</div>
							</div>
							{/* form  */}
							<form>
								<div className="flex gap-9 p-4 pl-0">
									<div className="grow-[1]">
										<label className="pb-2 text-sm">Email</label>
										<input
											className="inputCss"
											value={session?.user.email}
											disabled
										/>
									</div>
									<div className="grow-[1]">
										<label className="pb-2 text-sm">User Name *</label>
										<div>
											<input
												className="inputCss"
												type="text"
												placeholder="e.g. steven12"
												{...register("username")}
											/>
										</div>
									</div>
								</div>

								<div className="flex gap-9 p-4 pl-0 ">
									<div className="grow-[1] ">
										<label className="pb-2 text-sm">Full Name *</label>
										<input
											className="inputCss"
											type="text"
											placeholder="e.g. Steven King"
											{...register("full_name")}
										/>
									</div>
									<div className="grow-[1]">
										<label className="pb-2 text-sm">Locality *</label>
										<input
											className="inputCss"
											type="text"
											placeholder="e.g. Andheri"
										/>
									</div>
								</div>
								<button className="mt-3 w-full rounded-md bg-green-400 p-2 text-white duration-300 ease-in hover:bg-green-500">
									Update Information
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
