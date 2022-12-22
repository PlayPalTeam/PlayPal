import Head from "next/head";
import Link from "next/link";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import { SignInForm } from "../../types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Database } from "../../types/database.types";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const SignIn = () => {
	const [message, setMessage] = useState<string>("");

	const [signInData, setSignInData] = useState<SignInForm | null>(null);

	const { register, handleSubmit, reset } = useForm<SignInForm>();

	const supabase = useSupabaseClient<Database>();

	const router = useRouter();

	const onSubmit: SubmitHandler<SignInForm> = (data) => {
		setSignInData(data);
	};

	useEffect(() => {
		const signIn = async () => {
			if (!signInData) {
				return;
			}

			const {
				error,
				data: { user },
			} = await supabase.auth.signInWithPassword({
				email: signInData.email,
				password: signInData.password,
			});

			console.log(JSON.stringify(user, null, 2));

			if (error) {
				setMessage(JSON.stringify(error, null, 2));
			}

			router.push(`/${user?.user_metadata.role}`);

			reset();
			setSignInData(null);
		};

		signIn();
	}, [reset, router, signInData, supabase.auth]);

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
						<Link href={"/auth/SignIn"}>
							Don&apos;t have an account? Sign Up
						</Link>
					</p>
				</form>
				<p>{message}</p>
			</main>
		</>
	);
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);

	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return {
			redirect: {
				destination: `/${session.user.user_metadata.role}`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
