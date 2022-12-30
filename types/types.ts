import { HTMLInputTypeAttribute } from "react";
import * as z from "zod";

const username = z
	.string({
		required_error: "Username is required",
	})
	.min(3, "Username must be more than 3 character");

const email = z
	.string({ required_error: "Email is required" })
	.email({ message: "Invalid email address" });

const password = z
	.string()
	.regex(new RegExp(".*[A-Z].*"), "One uppercase character")
	.regex(new RegExp(".*[a-z].*"), "One lowercase character")
	.regex(new RegExp(".*\\d.*"), "One number")
	.regex(
		new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
		"One special character"
	)
	.min(8, "Must be at least 8 characters in length");

export const SignUpschema = z.object({
	username: username,
	email: email,
	password: password,
	role: z.enum(["user", "lister"], {
		required_error: "Select one of the choice",
	}),
});

export type SignUpForm = z.infer<typeof SignUpschema>;

// Zod schema for sign in page
export const SignInschema = z.object({
	email: email,
	password: password,
});

export type SignInForm = z.infer<typeof SignInschema>;

export const UserProfileSchema = z.object({
	email: email,
	username: username,
	full_name: z.string(),
	avatar_url: z.optional(z.string()),
	locality: z.string(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;

export const ForgotSchema = z.object({
	password: password,
	confirmpassword: password,
});

export type ForgortType = z.infer<typeof ForgotSchema>;

export type FormUIType = {
	label: string;
	name: "email" | "username" | "full_name" | "locality";
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	disabled?: boolean;
};



export type FormUIType1 = {
	label: string;
	name: "turf_name" | "location" | "price_per_hour" | "capacity" | "availability" ;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
};

export const TurfProfileSchema = z.object({
	turfname: z.string(),
	location: z.string(),
	priceperhour: z.number(),
	capacity: z.number(),
	availability: z.boolean()
});

export type TurfProfileType = z.infer<typeof TurfProfileSchema>;

export interface SignUpFormType {
	label: string;
	type: HTMLInputTypeAttribute;
	name: "username" | "email" | "password" | "role";
	placeholder?: string;
	options?: { value: string; label: string }[];
}

export type SignInFormType = {
	label: string;
	type: HTMLInputTypeAttribute;
	name: "email" | "password";
	placeholder: string;
};
