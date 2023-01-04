import {
	BookingFormProps,
	SignInFormProps,
	SignUpFormProps,
} from "../types/types";

const SignUpForm: SignUpFormProps[] = [
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
			{ value: "lister", label: "List your Turf" },
			{ value: "user", label: "Use the app" },
		],
	},
];

const SignInForm: SignInFormProps[] = [
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

const BookingForm: BookingFormProps[] = [
	{
		label: "Date",
		type: "date",
		name: "date",
	},
	{
		label: "Start Time",
		type: "time",
		name: "start-time",
	},
	{
		label: "End Time",
		type: "time",
		name: "end-time",
	},
	{
		label: "Player",
		type: "number",
		name: "player",
	},
];

export { SignInForm, SignUpForm, BookingForm };
