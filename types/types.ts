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

export type FormUIType = {
	label: string;
	name: "email" | "username" | "full_name" | "locality";
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	disabled?: boolean;
};
