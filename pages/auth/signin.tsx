import Head from "next/head";
import Link from "next/link";
import { SignInForm } from "../../src/content/contents";
import { Form, FormTitle } from "../../src/components";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import useHelper from "../../src/utils/helper";

const SignIn = () => {
	const { onSignInSubmit } = useHelper();

	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center bg-gray-100">
				<div className="formCss bg-white">
					<FormTitle title="PlayPal | SignIn" />
					<Form
						formFields={SignInForm}
						onSubmit={onSignInSubmit}
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
