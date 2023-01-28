import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {
	SignInData,
	SignUpData,
	ResetData,
	ForgotPasswordData,
} from "../types/types";


const useHelper = () => {
	const router = useRouter();

	const supabase = useSupabaseClient()



	const onSignUpSubmit: SubmitHandler<SignUpData> = async (data) => {
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

	const onSignInSubmit: SubmitHandler<SignInData> = async (data) => {
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

	const onResetSubmit: SubmitHandler<ResetData> = async (email) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email.email, {
			redirectTo: "http://localhost:3000/auth/forgot",
		});

		if (error) {
			toast.error(error.message, { duration: 5000 });
		}

		toast.success("Check your email", { duration: 5000 });
	};

	const onPasswordSubmit: SubmitHandler<ForgotPasswordData> = async ({
		password,
		confirmPassword,
	}) => {
		console.log(password);
		console.log(confirmPassword);

		if (password !== confirmPassword) {
			toast.error("Passwords must match");
			return;
		}

		const { error } = await supabase.auth.updateUser({
			password: password,
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

		toast.success("Password reset successful!", {
			duration: 5000,
			style: {
				border: "1px solid green",
				color: "green",
			},
		});

		router.push("/auth/signin");
	};

	return {
		onSignUpSubmit,
		onSignInSubmit,
		onResetSubmit,
		onPasswordSubmit,
	};
};

export default useHelper;
