import Head from "next/head";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, SelectInput } from "../../components";
import { Option, SignUpForm } from "../../types/types";
import { useState } from "react";
import Link from "next/link";

const options: Option[] = [
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

const SignUp = () => {
	const [message, setMessage] = useState<string>("");

	const { register, handleSubmit, reset } = useForm<SignUpForm>();

	const supabase = useSupabaseClient();

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
			setMessage(JSON.stringify(error, null, 2));
		} else {
			setMessage("Check your email.");
			reset();
			setMessage("");
		}
	};

	return (
		<>
			<Head>
				<title>PlayPal | Sign Up</title>
			</Head>
			<main className="flex h-screen flex-col items-center justify-center">
				<form
					className="w-[90%] max-w-md space-y-5 rounded-xl border p-5 shadow-sm shadow-green-300"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-2xl font-semibold">
						PlayPal | Sign Up
					</h1>
					<Input
						register={register}
						type={"text"}
						name="username"
						label="Username"
					/>
					<Input
						register={register}
						type={"email"}
						name="email"
						label="Email"
					/>
					<Input
						register={register}
						type={"password"}
						name="password"
						label="Password"
					/>
					<SelectInput
						label="What you want to do?"
						options={options}
						register={register}
					/>
					<Button
						className="w-full rounded-lg bg-green-300 px-4 py-2 text-xl font-semibold text-black hover:bg-green-400"
						type="submit"
					>
						Submit
					</Button>
					<Link className="" href={"/auth/signin"}>Already have an account? Sign In</Link>
				</form>
				<p className="p-2 text-center text-base font-semibold text-green-500">
					{message}
				</p>
			</main>
		</>
	);
};

export default SignUp;
