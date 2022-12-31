import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Button, ShowHideButton } from "../../src/components";
import { SignUpForm as Form } from "../../src/content/contents";
import { SignUpForm, SignUpschema } from "../../src/types/types";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const supabase = useSupabaseClient();

	const handleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpForm>({
		resolver: zodResolver(SignUpschema),
	});

	const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
		const { error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					username: data.username,
					role: data.role,
				},
				emailRedirectTo: "http://localhost:3000/auth/signin",
			},
		});

		if (error) {
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
				},
			});
		} else {
			toast.success("Check your email", { duration: 5000 });
		}
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center">
				<Toaster />
				<form
					className="w-full max-w-[35rem] space-y-5 rounded-lg px-8 py-4 shadow-sm shadow-green-500 transition duration-200 ease-in-out max-md:w-[90%]"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-xl font-bold text-gray-700">
						Sign Up
					</h1>
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{Form.map((field) => (
							<div key={field.name}>
								<label
									htmlFor={field.name}
									className="mb-2 block font-bold text-gray-700"
								>
									{field.label}
								</label>
								{field.type === "select" ? (
									<select
										name={field.name}
										{...register(field.name)}
										className={`inputCss`}
									>
										{field.options.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								) : (
									<>
										<div className="relative flex items-center">
											<input
												className={`inputCss`}
												type={
													field.type === "password" && showPassword
														? "text"
														: field.type
												}
												name={field.name}
												placeholder={field.placeholder}
												{...register(field.name)}
											/>
											{field.type === "password" && (
												<ShowHideButton
													handleShowPassword={handleShowPassword}
													showPassword={showPassword}
												/>
											)}
										</div>
										{errors[field.name] && (
											<p className="mt-1 text-xs italic text-red-500">
												{errors[field.name].message}
											</p>
										)}
									</>
								)}
							</div>
						))}
					</div>
					<Button isSubmitting={isSubmitting} text="Sign Up" />
					<div className="text-center font-medium text-green-500 hover:underline">
						<Link href="/auth/signin">Already have an account? Sign In</Link>
					</div>
				</form>
			</div>
		</>
	);
};
export default SignUp;
