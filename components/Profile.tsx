import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useUserProfile } from "../context/UserProfileContext";
import { Database } from "../types/database.types";
import { FormUIType, UserProfileSchema, UserProfileType } from "../types/types";
import Avatar from "./Avatar";
import { Button } from "./index";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";

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

const Profile = () => {
	const { userProfile } = useUserProfile();

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const { username, full_name, locality, avatar_url } = userProfile;

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UserProfileType>({
		resolver: zodResolver(UserProfileSchema),
	});

	const onSubmit: SubmitHandler<UserProfileType> = async (info) => {
		const { status, error } = await supabase
			.from("profiles")
			.update({
				username: info.username,
				full_name: info.full_name,
				locality: info.locality,
				updated_at: new Date().toISOString(),
			})
			.eq("id", user.id);

		if (error) {
			toast.success(error.message, {
				duration: 3000,
				style: {
					border: "1px solid red",
					color: "red",
				},
			});
		}

		if (status === 204) {
			toast.success("Your data is updated", {
				duration: 3000,
				style: {
					border: "1px solid green",
					color: "green",
				},
			});
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

	return (
		<div className="grow-[4]">
			<Toaster />
			<div className="flex rounded-lg border border-green-500">
				<Avatar uid={user?.id} size={100} url={avatar_url} />
			</div>

			<div className="mt-3 rounded-md border border-green-500 px-8 py-6">
				<div className="mt-3">
					<h3 className="text-lg">Your Information</h3>
				</div>
				<form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
						{FormUI.map((field) => (
							<>
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
										disabled={field.disabled}
									/>
								</div>
								{errors[field.name] && <p>{errors[field.name].message}</p>}
							</>
						))}
					</div>
					<Button text="Update Information" isSubmitting={isSubmitting} />
				</form>
			</div>
		</div>
	);
};

export default Profile;
