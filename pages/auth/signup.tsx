import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, SelectInput } from "../../components";
import { Option, SignUpForm } from "../../types";

const options: Option[] = [
	{
		value: "#",
		label: "Select your choice",
	},
	{
		value: "user",
		label: "Do you want to use the app?",
	},
	{
		value: "lister",
		label: "Do you want to list your place?",
	},
];

const SignUp = () => {
	const { register, handleSubmit } = useForm<SignUpForm>();

	const onSubmit: SubmitHandler<SignUpForm> = (data) => {
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<>
			<Head>
				<title>PlayPal | Sign Up</title>
			</Head>
			<main className="flex h-screen items-center justify-center">
				<form
					className="w-[90%] max-w-md space-y-5 rounded-xl border p-5 shadow-sm shadow-green-300"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-center text-2xl font-semibold">
						PlayPal | Sign Up
					</h1>
					<Input
						register={register}
						type={"text"}
						name="username"
						label="Username"
					/>
					<Input
						register={register}
						type={"email"}
						name="email"
						label="Email"
					/>
					<Input
						register={register}
						type={"password"}
						name="password"
						label="Password"
					/>
					<SelectInput
						label="What you want to do?"
						options={options}
						register={register}
					/>
					<Button
						className="w-full rounded-lg bg-green-300 px-4 py-2 text-xl font-semibold text-black hover:bg-green-400"
						type="submit"
					>
						Submit
					</Button>
				</form>
			</main>
		</>
	);
};

export default SignUp;
