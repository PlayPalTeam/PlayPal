import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	AiFillEye,
	AiFillEyeInvisible,
	AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { SignUpForm as Form } from "../../content/contents";
import { SignUpForm, SignUpschema } from "../../types/types";

const SignUp = () => {
	const [message, setMessage] = useState<string>("");

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const supabase = useSupabaseClient();

	const handleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpForm>({
		resolver: zodResolver(SignUpschema),
	});

	const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
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
			setMessage(error.message);
		} else {
			setMessage("Check your email");
		}
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
			<div className="flex h-screen flex-col items-center justify-center">
				<p className="mb-2 text-center text-xl text-green-500">{message}</p>
				<form
					className="w-full max-w-[35rem] space-y-5 rounded-lg px-8 py-4 shadow-sm shadow-green-500 transition duration-200 ease-in-out max-md:w-[90%]"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-xl font-bold text-gray-700">
						Sign Up
					</h1>
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{Form.map((field) => (
							<div key={field.name}>
								<label
									htmlFor={field.name}
									className="mb-2 block font-bold text-gray-700"
								>
									{field.label}
								</label>
								{field.type === "select" ? (
									<select
										name={field.name}
										{...register(field.name)}
										className={`inputCss`}
									>
										{field.options.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								) : (
									<>
										<div className="relative flex items-center">
											<input
												className={`inputCss`}
												type={
													field.type === "password" && showPassword
														? "text"
														: field.type
												}
												name={field.name}
												placeholder={field.placeholder}
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
								)}
							</div>
						))}
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="flex w-full items-center justify-center rounded-lg bg-green-500 py-2 font-bold text-white duration-300 ease-in hover:bg-green-600"
					>
						{isSubmitting ? (
							<AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
						) : (
							"Sign Up"
						)}
					</button>
					<div className="text-center font-medium text-green-500 hover:underline">
						<Link href="/auth/signin">Already have an account? Sign In</Link>
					</div>
				</form>
			</div>
		</>
	);
};
export default SignUp;
