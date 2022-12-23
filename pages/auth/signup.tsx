import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Form from "../../components/FormWrapper";
import { Input, SelectInput } from "../../components";
import Head from "next/head";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/database.types";
import { useState } from "react";

const options = [
	{
		value: "#",
		label: "Select your choice",
	},
	{
		value: "user",
		label: "Do you want to use the app?",
	},
	{
		value: "lister",
		label: "Do you want to list your place?",
	},
];

interface SignUpForm {
	username: string;
	email: string;
	password: string;
	role: string;
}

const SignInSchema = object().shape({
	username: string().required("Username is required"),
	email: string().email("Enter a valid email").required("Email is required"),
	password: string()
		.min(6, "Minimum length is 6")
		.required("Password is required"),
	role: string()
		.oneOf(["lister", "user"], "Please select a valid option")
		.required("Please select an option"),
});

const SignIn = () => {
	const [message, setMessage] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: {
			errors: { email, password, username },
		},
		reset,
	} = useForm<SignUpForm>({ resolver: yupResolver(SignInSchema) });

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
				emailRedirectTo: "https://playpal-eta.vercel.app/auth/signin",
			},
		});

		if (error) {
			setMessage(JSON.stringify(error, null, 2));
		} else {
			setMessage("Check your email.");
			reset();
		}
	};

	return (
		<>
			<Head>
				<title>PlayPal | Sign Up</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center">
				<p className="p-2 text-center text-base font-semibold text-green-500">
					{message}
				</p>
				<Form
					buttonLabel="Log In"
					register={register}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					className="w-[90%] max-w-md space-y-5 rounded-xl border p-5 shadow-sm shadow-green-300"
					btnCss="w-full rounded-lg bg-green-300 px-4 py-2 text-xl font-semibold text-black hover:bg-green-400"
				>
					<h1 className="text-center text-2xl font-semibold">
						PlayPal | Sign Up
					</h1>
					<Input
						label="Username"
						name="username"
						type={"text"}
						placeholder="Enter a username"
						error={username?.message}
						className="inputCss"
						autoFocus
					/>
					<Input
						label="Email"
						name={"email"}
						type="email"
						placeholder="Enter your email"
						error={email?.message}
						className="inputCss"
					/>
					<Input
						label="Password"
						name={"password"}
						type="password"
						placeholder="Enter your password"
						error={password?.message}
						className="inputCss"
					/>
					<SelectInput
						label="What you want to do?"
						options={options}
						register={register}
						name={"role"}
					/>
				</Form>
				<p className="mt-2 text-center hover:underline hover:underline-offset-1">
					<Link href={"/auth/signin"}>Already have an account? Sign In</Link>
				</p>
			</div>
		</>
	);
};

export default SignIn;
