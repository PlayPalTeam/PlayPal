import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { SignInType } from "../../src/types/types";
import { SignInForm } from "../../src/content/contents";
import { Form, FormTitle } from "../../src/components";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import toast, { Toaster } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const SignIn = () => {
	const router = useRouter();

	const supabase = useSupabaseClient();

	const onSubmit: SubmitHandler<SignInType> = async (data) => {
		const {
			error,
			data: { session },
		} = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
					color: "red",
				},
			});
		}

		if (session?.user.user_metadata) {
			router.push(`/${session.user.user_metadata.role}`);
		}
	};

	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center bg-gray-100">
				<Toaster />
				<div className="formCss bg-white">
					<FormTitle title="PlayPal | SignIn" />
					<Form
						formFields={SignInForm}
						onSubmit={onSubmit}
						form={"SignIn"}
						buttonType={"submit"}
						buttonText={"Log In"}
						className="my-5"
					/>
					<div className="flex flex-col text-center font-medium text-green-500">
						<Link className="hover:underline" href="/auth/signup">
							Don&apos;t have an account? Sign Up
						</Link>
						<Link className="hover:underline" href={"/auth/reset"}>
							Forgot Password
						</Link>
					</div>
				</div>
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
