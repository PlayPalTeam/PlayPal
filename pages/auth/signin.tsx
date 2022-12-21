import Head from "next/head";
import Link from "next/link";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import { SignUpForm } from "../../types/types";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
	const [message, setMessage] = useState("");

	const router = useRouter();

	// useForm hook to handle the form.
	const { register, handleSubmit, reset } = useForm<SignUpForm>();

	// instance of supabaseclient to use in the form.
	const supabase = useSupabaseClient();

	// A function to submit the data.
	const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			setMessage(JSON.stringify(error, null, 2));
		}

		router.push("/user");
	};

	return (
		<>
			<Head>
				<title>PlayPal | Sign In</title>
			</Head>
			<main className="flex h-screen flex-col items-center justify-center">
				<form
					className="w-[90%] max-w-md space-y-5 rounded-xl border p-5 shadow-sm shadow-green-300"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-2xl font-semibold">
						PlayPal | Sign In
					</h1>
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
					<Button
						className="w-full rounded-lg bg-green-300 px-4 py-2 text-xl font-semibold text-black hover:bg-green-400"
						type="submit"
					>
						Submit
					</Button>
					<p className="text-center hover:underline hover:underline-offset-1">
						<Link href={"/auth/signup"}>Already have an account? Sign In</Link>
					</p>
				</form>
				<p>{message}</p>
			</main>
		</>
	);
};

export default SignUp;
