import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { HTMLInputTypeAttribute, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgortType, ForgotSchema } from "../../src/types/types";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { Button, ShowHideButton } from "../../src/components";

interface FormField {
	label: string;
	name: "password" | "confirmpassword";
	placeholder: string;
	type: HTMLInputTypeAttribute;
	error: any;
}

const ForgotPassword = () => {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] =
		useState<boolean>(false);

	const {
		register,
		formState: { errors, isSubmitting },
		reset,
		handleSubmit,
	} = useForm<ForgortType>({
		resolver: zodResolver(ForgotSchema),
	});

	const supabase = useSupabaseClient();

	const router = useRouter();

	const submit: SubmitHandler<ForgortType> = async ({
		password,
		confirmpassword,
	}) => {
		if (password !== confirmpassword) {
			toast.error("Passwords must match");
			return;
		}

		const { error } = await supabase.auth.updateUser({
			password: password,
		});

		reset();

		if (error) {
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
					color: "red",
				},
			});
		}

		toast.success("Password reset successful!", {
			duration: 5000,
			style: {
				border: "1px solid green",
				color: "green",
			},
		});

		router.push("/auth/signin");
	};

	const handlePasswordShow = useCallback(() => {
		setPasswordVisible(!passwordVisible);
	}, [passwordVisible]);

	const handleConfirmPasswordShow = useCallback(() => {
		setConfirmPasswordVisible(!confirmPasswordVisible);
	}, [confirmPasswordVisible]);

	const formFields: FormField[] = [
		{
			label: "Password",
			name: "password",
			placeholder: "e.g. steven@12",
			type: passwordVisible ? "text" : "password",
			error: errors.password,
		},
		{
			label: "Confirm Password",
			name: "confirmpassword",
			placeholder: "e.g. steven@12",
			type: confirmPasswordVisible ? "text" : "password",
			error: errors.confirmpassword,
		},
	];

	return (
		<div className="flex h-screen items-center justify-center">
			<Toaster />
			<form
				className="w-[90%] max-w-sm space-y-5"
				onSubmit={handleSubmit(submit)}
			>
				{formFields.map((field) => (
					<div key={field.name}>
						<label
							className="mb-2 block font-bold text-gray-700"
							htmlFor={field.name}
						>
							{field.label}
						</label>
						<div className="relative flex items-center">
							<input
								type={field.type}
								name={field.name}
								placeholder={field.placeholder}
								className={`inputCss text-lg caret-green-600`}
								{...register(field.name)}
							/>
							{field.name === "password" && (
								<ShowHideButton
									handleShowPassword={handlePasswordShow}
									showPassword={passwordVisible}
								/>
							)}

							{field.name === "confirmpassword" && (
								<ShowHideButton
									handleShowPassword={handleConfirmPasswordShow}
									showPassword={confirmPasswordVisible}
								/>
							)}
						</div>
						{field.error && (
							<p className="mt-1 text-xs italic text-red-500">
								{field.error.message}
							</p>
						)}
					</div>
				))}

				<Button type="submit" text="Reset Password" isSubmitting={isSubmitting} />
			</form>
		</div>
	);
};

export default ForgotPassword;
