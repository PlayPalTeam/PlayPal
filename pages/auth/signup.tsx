import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Form, FormTitle } from "../../src/components";
import { SignUpForm } from "../../src/content/contents";
import { SignUpFormProps } from "../../src/types/types";

const SignUp = () => {
	const {
		formState: { isSubmitting },
	} = useForm();

	const supabase = useSupabaseClient();

	const onSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
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
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
				},
			});
		} else {
			toast.success("Check your email", { duration: 5000 });
		}
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
			<main className="flex h-screen flex-col items-center justify-center">
				<div className="formCss">
					<FormTitle title="PlayPal | SignUp" />
					<div className="">
						<Form
							formFields={SignUpForm}
							onSubmit={onSubmit}
							form={"SignUp"}
							buttonType={"submit"}
							buttonText={"Sign Up"}
							className="mb-5"
						/>
					</div>
					<div className="text-center font-medium text-green-500 hover:underline">
						<Link href="/auth/signin">Already have an account? Sign In</Link>
					</div>
				</div>
			</main>
		</>
	);
};
export default SignUp;
