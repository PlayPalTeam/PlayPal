import { useUser } from "@supabase/auth-helpers-react";
import { useUserProfile } from "../context/UserProfileContext";
import { Button } from "./index";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form/dist/types";
import { UserProfileData } from "../types/types";

const FormUI = [
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
];

const Profile = () => {
	const { userProfile, updateUserProfile } = useUserProfile();

	const user = useUser();

	const { username, full_name } = userProfile;

	const {
		register,
		reset,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit: SubmitHandler<UserProfileData> = async (info) => {
		updateUserProfile(info);
	};

	useEffect(() => {
		let defaultValues = {
			username: "",
			full_name: "",
		};
		defaultValues.username = username;
		defaultValues.full_name = full_name;
		reset({ ...defaultValues });
	}, [full_name, reset, user?.email, username]);

	return (
		<div>
			<div className="flex rounded-lg border border-green-500"></div>
			<div className="mt-3 rounded-md border border-green-500 px-8 py-6">
				<div className="mt-3">
					<h3 className="text-lg">Your Information</h3>
				</div>
				<form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
						<div>
							<label className="pb-2 text-sm" htmlFor={"email"}>
								{"Email"} <span className="font-bold text-red-900">*</span>
							</label>
							<p className="inputCss">{user?.email}</p>
						</div>
						{FormUI.map((field) => (
							<div key={field.name}>
								<label className="pb-2 text-sm" htmlFor={field.name}>
									{field.label}{" "}
									<span className="font-bold text-red-900">*</span>
								</label>
								<input
									className="inputCss"
									type={field.type}
									placeholder={field.placeholder}
									{...register(field.name)}
								/>
							</div>
						))}
					</div>
					<Button
						text="Update Information"
						isSubmitting={isSubmitting}
						type={"submit"}
					/>
				</form>
			</div>
		</div>
	);
};

export default Profile;
