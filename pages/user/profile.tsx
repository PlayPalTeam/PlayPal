import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navbar, Avatar } from "../../components";
import { useUserProfile } from "../../context/UserProfileContext";
import { Database } from "../../types/database.types";
import {
	FormUIType,
	UserProfileSchema,
	UserProfileType,
} from "../../types/types";

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

const FormUI: FormUIType[] = [
	{
		label: "Email",
		name: "email",
		disabled: true,
	},
	{
		label: "Username",
		name: "username",
		type: "text",
		placeholder: "e.g. Steven@12",
	},
	{
		label: "Full Name",
		name: "full_name",
		type: "text",
		placeholder: "e.g. Steven King",
	},
	{
		label: "Locality",
		name: "locality",
		type: "text",
		placeholder: "e.g. Andheri",
	},
];

const UserProfile = () => {
	const { userProfile } = useUserProfile();

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const { username, full_name, locality, avatar_url } = userProfile;

	const { register, reset, handleSubmit } = useForm<UserProfileType>({
		resolver: zodResolver(UserProfileSchema),
	});

	const onSubmit: SubmitHandler<UserProfileType> = async (info) => {
		console.log("Click");
		const { status } = await supabase
			.from("profiles")
			.update({
				username: info.username,
				full_name: info.full_name,
				locality: info.locality,
				updated_at: new Date().toISOString(),
			})
			.eq("id", user.id);

		if (status === 204) {
			alert("Your data is updated.");
		}
	};

	useEffect(() => {
		let defaultValues = {
			email: "",
			username: "",
			full_name: "",
			locality: "",
		};
		defaultValues.email = user?.email;
		defaultValues.username = username;
		defaultValues.full_name = full_name;
		defaultValues.locality = locality;
		reset({ ...defaultValues });
	}, [full_name, locality, reset, user?.email, username]);

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
				<section className="flex flex-wrap gap-10 p-12">
					<div className="grow-[1] p-2">
						{profilesettings.map((data, index) => (
							<button
								key={index}
								onClick={decide}
								className="m-5 flex flex-col items-start rounded-md border border-green-500 p-3 pt-2"
							>
								<p>{data.name}</p>
								<p className="text-xs">{data.info} </p>
							</button>
						))}
					</div>
					<div className="grow-[4]">
						<div className="flex rounded-lg border border-green-500">
							<Avatar uid={user?.id} size={100} url={avatar_url} />
						</div>

						<div className="mt-3 rounded-md border border-green-500 px-8 py-6">
							<div className="mt-3">
								<h3 className="text-lg">Your Information</h3>
							</div>
							<form
								className="mt-10 space-y-6"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
									{FormUI.map((form) => (
										<div key={form.name}>
											<label className="pb-2 text-sm" htmlFor={form.name}>
												{form.label}{" "}
												<span className="font-bold text-red-900">*</span>
											</label>
											<input
												className="inputCss"
												type={form.type}
												placeholder={form.placeholder}
												{...register(form.name)}
												disabled={form.disabled}
											/>
										</div>
									))}
								</div>
								<button
									type="submit"
									className="w-full rounded-md bg-green-400 p-2 font-bold text-white duration-300 ease-in hover:bg-green-500"
								>
									Update Information
								</button>
							</form>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default UserProfile;
