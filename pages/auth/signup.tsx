import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpschema, SignUpForm } from "../../types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Database } from "../../types/database.types";

type FormType = {
	label: string;
	type: string;
	name: "username" | "email" | "password";
	css: string;
}[];

const Form: FormType = [
	{
		label: "Username",
		type: "text",
		name: "username",
		css: "inputCss",
	},
	{
		label: "Email",
		type: "email",
		name: "email",
		css: "inputCss",
	},
	{ label: "Password", type: "password", name: "password", css: "inputCss" },
];

const SignUp = () => {
	const [message, setMessage] = useState<string>("");

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpForm>({
		resolver: zodResolver(SignUpschema),
	});

	const supabase = useSupabaseClient<Database>();

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
			setMessage(error.message);
		} else {
			setMessage("Check your email");
		}
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center">
				<p className="mb-2 text-center text-xl text-green-500">{message}</p>
				<form
					className="w-full max-w-[35rem] space-y-5 rounded-lg px-8 py-4 shadow-sm shadow-green-500 max-md:w-[90%]"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-xl font-bold text-gray-700">
						Sign Up
					</h1>
					<div className="flex flex-col max-md:space-y-5 md:flex-row md:justify-between">
						<div className="md:mr-5 md:w-1/2">
							<label htmlFor={Form[0].name} className="font-bold text-gray-700">
								{Form[0].label}
							</label>
							<div className="relative flex items-center">
								<input
									type={Form[0].type}
									name={Form[0].name}
									{...register(Form[0].name)}
									className={`${Form[0].css} placeholder-gray-700`}
									placeholder={Form[0].label}
								/>
							</div>
							{errors.username && (
								<p className="text-xs italic text-red-500">
									{errors.username.message}
								</p>
							)}
						</div>
						<div className="md:w-1/2">
							<label htmlFor={Form[1].name} className="font-bold text-gray-700">
								{Form[1].label}
							</label>
							<div className="relative flex items-center">
								<input
									type={Form[1].type}
									name={Form[1].name}
									{...register(Form[1].name)}
									className={`${Form[1].css} placeholder-gray-700`}
									placeholder={Form[1].label}
								/>
							</div>
							{errors.email && (
								<p className="text-xs italic text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>
					<div className="flex flex-col max-md:space-y-5 md:flex-row md:justify-between">
						<div className="md:mr-5 md:w-1/2">
							<label htmlFor={Form[2].name} className="font-bold text-gray-700">
								{Form[2].label}
							</label>
							<div className="relative flex items-center">
								<input
									type={
										Form[2].type === "password" && showPassword
											? "text"
											: Form[2].type
									}
									name={Form[2].name}
									{...register(Form[2].name)}
									className={`${Form[2].css} placeholder-gray-700`}
									placeholder={Form[2].label}
								/>
								<button
									type="button"
									onClick={handleShowPassword}
									className="absolute right-3"
								>
									{Form[2].type === "password" ? (
										<>
											{showPassword ? (
												<AiFillEye
													className="h-6 w-6"
													onClick={handleShowPassword}
												/>
											) : (
												<AiFillEyeInvisible
													className="h-6 w-6"
													onClick={handleShowPassword}
												/>
											)}
										</>
									) : null}
								</button>
							</div>
							{errors.password && (
								<p className="text-xs italic text-red-500">
									{errors.password.message}
								</p>
							)}
							{Form[2].type === "password" && (
								<ul className="text-xs italic text-gray-600">
									<li>At least 8 characters</li>
									<li>At least one lowercase letter</li>
									<li>At least one upper letter</li>
									<li>At least one number</li>
								</ul>
							)}
						</div>
						<div className="md:w-1/2">
							<label htmlFor="role" className="font-bold text-gray-700">
								Role
							</label>
							<div className="relative flex items-center">
								<select
									name="role"
									{...register("role")}
									className="inputCss placeholder-gray-700"
								>
									<option value="user">Member</option>
									<option value="lister">Admin</option>
								</select>
							</div>
							{errors.role && (
								<p className="text-xs italic text-red-500">
									{errors.role.message}
								</p>
							)}
						</div>
					</div>
					<button
						type="submit"
						className="w-full rounded-lg bg-green-500 py-2 font-bold text-white duration-300 ease-in hover:bg-green-600"
					>
						Sign Up
					</button>
					<div className="text-center font-medium text-green-500 hover:underline">
						<Link href="/auth/signin">Already have an account?</Link>
					</div>
				</form>
			</div>
		</>
	);
};
export default SignUp;
