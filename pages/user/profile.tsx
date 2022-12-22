import useSWR from "swr";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import logo1 from "../../public/logo1.jpg";
import { UserProfile } from "../../types/types";
import { useState } from "react";
import { Input } from "../../components";

const fetcher = (url: string) =>
	fetch(url, { method: "GET" }).then((res) => res.json());

const UserProfile = () => {
	const { data, error } = useSWR<UserProfile[]>("/api/profile", fetcher);

	console.log(error);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!data) {
		return <div>Loading.....</div>;
	}

	const profilesettings = [
		{
			name: "Account Settings",
			info: "Details about your personal information",
		},
		{
			name: "Notification",
			info: "Details about your personal information",
		},
		{
			name: "Membership Plan ",
			info: "Details about your personal information",
		},
		{
			name: "Password and Security",
			info: "Details about your personal information",
		},
	];

	function decide(){
		console.log("few")
	}

	return (
		
		<div className="flex">

			<Navbar />
	
			<div className=" flex w-[100vw] gap-10 p-12 ">
				{/* main 1 */}
				<div className=" grow-[1]">
					<div className="p-2">
						{profilesettings.map((data, index) => (
							<div key={index} className=" m-5 border-2 p-3 pt-2 flex flex-col items-start">
								<button onClick={decide}>{data.name}</button>
								<div className="text-xs">{data.info} </div>
							</div>
						))}
					</div>
				</div>
				{/* main 2 */}
				<div className="grow-[4] mr-14">
					<div className="flex gap-2 p-12 pl-14 border-2">
						<div className=" ">
							<Image src={logo1} alt="img" height={160} width={140} />
						</div>
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
					
					<div className="p-12 pt-2 border-2 mt-5" >
						<div className="mt-3">
							<div className="text-lg mb-5 ">Change User Information here</div>
						</div>
						{/* form  */}
						<form>

							{/* <div>
				{data.map((user) => (
					<section key={user.role}>
						<p>Username: {user.username}</p>
						<p>Full Name:{user.full_name}</p>
					</section>
				))}
			</div> */}
			

			

			
						<div className="flex p-4 pl-0 gap-9 ">
							
							<div className="grow-[1] ">
								<div className="pb-2 text-sm">Full Name *</div>
								<div className="">
									<input className=" rounded-md h-8 w-[100%] max-w-[280px] border-2 "   type="text" placeholder="Full Name" />
								</div>
							</div>
							<div className="grow-[1]">
								<div className="pb-2 text-sm">User Name *</div>
								<div>
								<input className=" rounded-md h-8 w-[100%] max-w-[280px] border-2"  type="text" placeholder="User Name" />
								</div>
							</div>

						</div>

						<div className="flex p-4 pl-0 gap-9 ">
							<div className="grow-[1] ">
								<div className="pb-2 text-sm">City *</div>
								<div className="">
									<input className=" rounded-md h-8 w-[100%] max-w-[280px] border-2" type="text" placeholder="City" />
								</div>
							</div>
							<div className="grow-[1]">
								<div className="pb-2 text-sm">State *</div>
								<div>
								<input className=" rounded-md h-8 w-[100%] max-w-[280px] border-2 " type="text" placeholder="State" />
								</div>
							</div>
						</div>

						<div className="flex p-4 pl-0 gap-9 ">
							<div className="grow-[1] ">
								<div className="pb-2 text-sm">Zip-Code *</div>
								<div className="">
									<input className=" rounded-md h-8 w-[100%] max-w-[280px] border-2" type="text" placeholder="Zip-Code" />
								</div>
							</div>
							<div className="grow-[1]">
								<div className="pb-2 text-sm">Country*</div>
								<div>
								<input className=" rounded-md h-8 w-[100%] max-w-[280px] border-2 " type="text" placeholder="Coountry" />
								</div>
							</div>
						</div>
						<div className="mt-3 bg-green-400">
							<button className="border-2 p-2 w-[100%]">Update Information</button>
						</div>

						</form>


		

					</div>
				
				</div>
			</div>

			{/* <div>
				{data.map((user) => (
					<section key={user.role}>
						<p>Username: {user.username}</p>
						<p>Full Name:{user.full_name}</p>
					</section>
				))}
			</div> */}
		</div>
	);
};

export default UserProfile;
