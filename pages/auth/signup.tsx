import Form from "@components/FormComponent";
import FormTitle from "@components/FormTitle";
import { SignUpForm } from "@content/contents";
import useHelper from "@utils/helper";
import Head from "next/head";
import Link from "next/link";

const SignUp = () => {
	const { onSignUpSubmit } = useHelper();

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
			<main className="flex h-screen items-center justify-center">
				<div className="formCss">
					<FormTitle title="PlayPal | SignUp" />
					<Form
						formFields={SignUpForm}
						onSubmit={onSignUpSubmit}
						form={"SignUp"}
						buttonType={"submit"}
						buttonText={"SignUp"}
						className="mb-5"
					/>
					<div className="text-center font-medium text-green-500 hover:underline">
						<Link href="/auth/signin">Already have an account? Sign In</Link>
					</div>
				</div>
			</main>
		</>
	);
};
export default SignUp;
