import { useUser } from "@supabase/auth-helpers-react";
import { useUserProfile } from "../context/UserProfileContext";
import  Avatar  from "./Avatar";
import { useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { UserProfileData, UserProfileSchema } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormField {
	label: string;
	name: keyof UserProfileData;
	type: string;
	placeholder: string;
	valueAsNumber?: boolean;
}

const FormUI: FormField[] = [
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
		label: "Phone Number",
		name: "phone_number",
		type: "text",
		placeholder: "+918524561234",
		valueAsNumber: true,
	},
];

const Profile = () => {
	const { userProfile, updateUserProfile } = useUserProfile();
	const user = useUser();
	const { register, reset, handleSubmit, formState } = useForm({
		resolver: zodResolver(UserProfileSchema),
	});

	const onSubmit = useCallback(
		async (info: UserProfileData) => {
			updateUserProfile(info);
		},
		[updateUserProfile]
	);

	useEffect(() => {
		reset({
			username: userProfile?.username || "",
			full_name: userProfile?.full_name || "",
			phone_number: userProfile?.phone_number?.toString() || ""
		});
	}, [reset, userProfile]);

	return (
		<div>
			<div className="flex rounded-lg border border-green-500">
				<Avatar showUploadButton={true} />
			</div>
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
									name={field.name}
									{...register(field.name, { valueAsNumber: field.valueAsNumber })}
								/>
							</div>
						))}
					</div>
					<div className="text-center">
						<button
							className="mt-6 bg-green-500 text-white"
							type="submit"
							disabled={formState.isSubmitting}
						>
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Profile;