import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Database } from "../../types/database.types";
import { Button } from "../../components";
import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

type ResetForm = {
	email: string;
};

const ResetPasswordLink = () => {
	const [message, setMessage] = useState<String>("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ResetForm>();

	const supabase = useSupabaseClient<Database>();

	const submit: SubmitHandler<ResetForm> = async (email) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email.email, {
			redirectTo: "http://localhost:3000/auth/forgot",
		});

		if (error) {
			toast.error(error.message, { duration: 1000 });
		}

		toast.success("Check your email", { duration: 1000 });
		reset();
	};

	return (
		<div className="flex h-[25rem] flex-col items-center justify-center md:h-screen">
			<Toaster />
			<form
				className="w-[90%] max-w-sm space-y-5 md:w-full"
				onSubmit={handleSubmit(submit)}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						className="inputCss"
						type="email"
						name="email"
						id="email"
						{...register("email", { required: true })}
					/>
					{errors.email && <p>{errors.email.message}</p>}
				</div>
				<Button isSubmitting={isSubmitting} text={"Send Password Reset Link"} />
				<div className="text-center font-medium text-green-500 hover:underline">
					<Link href="/auth/signin">Already have an account? Sign In</Link>
				</div>
			</form>
		</div>
	);
};

export default ResetPasswordLink;
