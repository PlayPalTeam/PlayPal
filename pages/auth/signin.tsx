import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Form from "../../components/FormWrapper";
import { Input } from "../../components";
import Head from "next/head";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/database.types";
import { useRouter } from "next/router";
import { useState } from "react";

interface SignInForm {
	email: string;
	password: string;
}

const SignInSchema = object().shape({
	email: string().email("Enter a valid email").required("Email is required"),
	password: string()
		.min(6, "Minimum length is 6")
		.required("Password is required"),
});

const SignIn = () => {
	const [message, setMessage] = useState<string>("");

	const supabase = useSupabaseClient<Database>();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {
			errors: { email, password },
		},
	} = useForm<SignInForm>({ resolver: yupResolver(SignInSchema) });

	const onSubmit: SubmitHandler<SignInForm> = async (data) => {
		const {
			error,
			data: { user },
		} = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			setMessage(error.message);
		}

		if (user?.user_metadata) {
			router.push(`/${user?.user_metadata.role}`);
		}
	};

	return (
		<>
			<Head>
				<title>PlayPal | Sign In</title>
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
						PlayPal | Sign In
					</h1>
					<Input
						label="Email"
						name={"email"}
						type="email"
						placeholder="Enter your email"
						error={email?.message}
						className="inputCss"
						autoFocus
					/>
					<Input
						label="Password"
						name={"password"}
						type="password"
						placeholder="Enter your password"
						error={password?.message}
						className="inputCss"
					/>
				</Form>
				<p className="mt-2 text-center hover:underline hover:underline-offset-1">
					<Link href={"/auth/signup"}>Don&apos;t have an account? Sign Up</Link>
				</p>
			</div>
		</>
	);
};

export default SignIn;
