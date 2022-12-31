import { SignInFormType, SignUpFormType } from "../types/types";

const SignUpForm: SignUpFormType[] = [
	{
		label: "Username",
		type: "text",
		placeholder: "e.g. StevenKing@12",
		name: "username",
	},
	{
		label: "Email",
		type: "email",
		placeholder: "e.g. stevenking@gmail.com",
		name: "email",
	},
	{
		label: "Password",
		type: "password",
		placeholder: "e.g. StevenKing@12",
		name: "password",
	},
	{
		label: "Role",
		type: "select",
		name: "role",
		options: [
			{ value: "#", label: "Select" },
			{ value: "lister", label: "List your Turf" },
			{ value: "user", label: "Use the app" },
		],
	},
];

const SignInForm: SignInFormType[] = [
	{
		label: "Email",
		type: "email",
		placeholder: "e.g. stevenking@gmail.com",
		name: "email",
	},
	{
		label: "Password",
		type: "password",
		placeholder: "e.g. StevenKing@12",
		name: "password",
	},
];

export { SignInForm, SignUpForm };
