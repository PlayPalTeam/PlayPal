import Navbar from "../../components/Navbar";
import useSWR from "swr";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema, UserProfileType } from "../../types/types";
import { useUserProfile } from "../../context/UserProfileContext";

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
	

	const { username, full_name } = userProfile;
	
	const { register } = useForm<UserProfileType>({
		defaultValues: {
			username: username,
			full_name: full_name,
		},
		resolver: zodResolver(UserProfileSchema),

	});

	function decide() {
		console.log("few");
	}

	return (
		<div className="flex">
			<Navbar />
			<div className=" flex w-screen gap-10 p-12 ">
				{/* main 1 */}
				<div className=" grow-[1]">
					<div className="p-2">
						{profilesettings.map((data, index) => (
							<div
								key={index}
								className=" m-5 flex flex-col items-start border-2 p-3 pt-2"
							>
								<button onClick={decide}>{data.name}</button>
								<div className="text-xs">{data.info} </div>
							</div>
						))}
					</div>
				</div>
				{/* main 2 */}
				<div className="mr-14 grow-[4]">
					<div className="flex gap-2 border-2 p-12 pl-14">
						{/* <div className=" ">
							<Image src={logo1} alt="img" height={160} width={140} />
						</div> */}
						<div className="m-auto ml-14 grow-[2] ">
							<div>Upload a new Photo</div>
							<div>Image name </div>
						</div>
						<div className=" m-auto mr-4 grow-[1]">
							<button className="ml-3 rounded-lg border-2 p-2 pl-4 pr-4">
								Update
							</button>
						</div>
					</div>

					<div className="mt-5 border-2 p-12 pt-2">
						<div className="mt-3">
							<div className="mb-5 text-lg ">Change User Information here</div>
						</div>
						{/* form  */}
						<form>
							<div className="flex gap-9 p-4 pl-0">
								{/* <div className="grow-[1]">
									<label className="block pb-2 text-sm">Email</label>
									<input
										className="h-8 w-[100%] max-w-[280px] rounded-md border-2 "
										value={session?.user.email}
										disabled
									/>
								</div> */}
								<div className="grow-[1]">
									<div className="pb-2 text-sm">User Name *</div>
									<div>
										<input
											className=" h-8 w-[100%] max-w-[280px] rounded-md border-2"
											type="text"
											{...register("username")}
										/>
									</div>
								</div>
							</div>

							<div className="flex gap-9 p-4 pl-0 ">
								<div className="grow-[1] ">
									<div className="pb-2 text-sm">City *</div>
									<div className="">
										<input
											className=" h-8 w-[100%] max-w-[280px] rounded-md border-2"
											type="text"
											placeholder="City"
										/>
									</div>
								</div>
								<div className="grow-[1]">
									<div className="pb-2 text-sm">State *</div>
									<div>
										<input
											className=" h-8 w-[100%] max-w-[280px] rounded-md border-2 "
											type="text"
											placeholder="State"
										/>
									</div>
								</div>
							</div>

							<div className="flex gap-9 p-4 pl-0 ">
								<div className="grow-[1] ">
									<div className="pb-2 text-sm">Zip-Code *</div>
									<div className="">
										<input
											className=" h-8 w-[100%] max-w-[280px] rounded-md border-2"
											type="text"
											placeholder="Zip-Code"
										/>
									</div>
								</div>
								<div className="grow-[1]">
									<div className="pb-2 text-sm">Country*</div>
									<div>
										<input
											className=" h-8 w-[100%] max-w-[280px] rounded-md border-2 "
											type="text"
											placeholder="Coountry"
										/>
									</div>
								</div>
							</div>
							<div className="mt-3 bg-green-400">
								<button className="w-[100%] border-2 p-2">
									Update Information
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
