import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Database } from "../../src/types/database.types";
import { Button } from "../../src/components";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

type ResetForm = {
	email: string;
};

const ResetPasswordLink = () => {
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
			toast.error(error.message, { duration: 5000 });
		}

		toast.success("Check your email", { duration: 5000 });
		reset();
	};

	return (
		<div className="flex h-[25rem] flex-col items-center justify-center md:h-screen">
			<Toaster />
			<form
				className="w-[90%] max-w-sm space-y-5"
				onSubmit={handleSubmit(submit)}
			>
				<div>
					<label className="mb-2 block font-bold text-gray-700" htmlFor="email">
						Email
					</label>
					<input
						className="inputCss"
						type="email"
						name="email"
						id="email"
						placeholder="e.g. stevenking@gmail.com"
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
