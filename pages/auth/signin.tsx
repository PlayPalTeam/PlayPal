import Head from "next/head";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SignInForm, SignInschema } from "../../types/types";
import { Database } from "../../types/database.types";

type FormType = {
	label: string;
	type: string;
	name: "email" | "password";
	css: string;
}[];

const Form: FormType = [
	{
		label: "Email",
		type: "email",
		name: "email",
		css: "inputCss",
	},
	{ label: "Password", type: "password", name: "password", css: "inputCss" },
];
const SignIn = () => {
	const [message, setMessage] = useState<string>("");

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const supabase = useSupabaseClient<Database>();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(SignInschema),
	});

	const onSubmit: SubmitHandler<SignInForm> = async (data) => {
		const {
			error,
			data: { session },
		} = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			setMessage(error.message);
		}

		if (session?.user.user_metadata) {
			router.push(`/${session.user.user_metadata.role}/profile`);
		}
	};

	const handleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center">
				<p className="mb-2 text-center text-xl text-green-500">{message}</p>
				<form
					className="w-full max-w-sm space-y-5 rounded-lg px-8 py-4 shadow-sm shadow-green-500 max-md:w-[90%]"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-xl font-bold text-gray-700">
						Sign In
					</h1>
					<div>
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
						{errors.email && (
							<p className="text-xs italic text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>
					<div>
						<label htmlFor={Form[1].name} className="font-bold text-gray-700">
							{Form[1].label}
						</label>
						<div className="relative flex items-center">
							<input
								type={
									Form[1].type === "password" && showPassword
										? "text"
										: Form[1].type
								}
								name={Form[1].name}
								{...register(Form[1].name)}
								className={`${Form[1].css} placeholder-gray-700`}
								placeholder={Form[1].label}
							/>
							<button
								type="button"
								onClick={handleShowPassword}
								className="absolute right-3"
							>
								{Form[1].type === "password" ? (
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
					</div>
					<button
						type="submit"
						className="w-full rounded-lg bg-green-500 py-2 font-bold text-white duration-300 ease-in hover:bg-green-600"
					>
						Log In
					</button>
					<div className="text-center font-medium text-green-500 hover:underline">
						<Link href="/auth/signup">Don&apos;t have an account?</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignIn;
