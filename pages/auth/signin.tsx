import Head from "next/head";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SignInForm, SignInschema } from "../../types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SignInForm as Form } from "../../content/contents";
import { Button } from "../../components";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const SignIn = () => {
	const [message, setMessage] = useState<string>("");

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const supabase = useSupabaseClient();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
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
					{Form.map((field) => (
						<div key={field.name}>
							<label
								htmlFor={field.name}
								className="mb-2 block font-bold text-gray-700"
							>
								{field.label}
							</label>
							<>
								<div className="relative flex items-center">
									<input
										type={
											field.type === "password" && showPassword
												? "text"
												: field.type
										}
										name={field.name}
										placeholder={field.placeholder}
										className={`inputCss`}
										{...register(field.name)}
									/>
									{field.type === "password" && (
										<button
											type="button"
											className="absolute right-2"
											onClick={handleShowPassword}
										>
											{showPassword ? (
												<AiFillEye className="h-6 w-6" />
											) : (
												<AiFillEyeInvisible className="h-6 w-6" />
											)}
										</button>
									)}
								</div>
								{errors[field.name] && (
									<p className="mt-1 text-xs italic text-red-500">
										{errors[field.name].message}
									</p>
								)}
							</>
						</div>
					))}
					<Button isSubmitting={isSubmitting} text={"Log In"} />
					<div className="flex flex-col text-center font-medium text-green-500">
						<Link className="hover:underline" href="/auth/signup">
							Don&apos;t have an account? Sign Up
						</Link>
						<Link className="hover:underline" href={"/auth/reset"}>
							Forgot Password
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return {
			redirect: {
				destination: `/${session?.user.user_metadata.role}`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
