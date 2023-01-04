import { HTMLInputTypeAttribute } from "react";
import { z } from "zod";

// Validates that the input is a non-empty string with at least 3 characters
const usernameValidation = z
	.string({
		required_error: "Username is required",
	})
	.min(3, "Username must be more than 3 characters");

// Validates that the input is a non-empty string that is a valid email address
const emailValidation = z
	.string({ required_error: "Email is required" })
	.email({ message: "Invalid email address" });

// Validates that the input is a non-empty string that is at least 8 characters long and contains at least one uppercase letter,
// one lowercase letter, one number, and one special character
const passwordValidation = z
	.string()
	.regex(new RegExp(".*[A-Z].*"), "One uppercase character")
	.regex(new RegExp(".*[a-z].*"), "One lowercase character")
	.regex(new RegExp(".*\\d.*"), "One number")
	.regex(
		new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
		"One special character"
	)
	.min(8, "Must be at least 8 characters in length");

// Schema for validating the input for a sign up form
export const SignUpSchema = z.object({
	username: usernameValidation,
	email: emailValidation,
	password: passwordValidation,
	role: z.enum(["user", "lister"], {
		required_error: "Select one of the choices",
	}),
});

export interface SignUpFormProps {
	label: string;
	type: HTMLInputTypeAttribute;
	name: "username" | "email" | "password" | "role";
	placeholder?: string;
	options?: { value: string; label: string }[];
}

// Type representing the shape of an object that conforms to the SignUpFormSchema
export type SignUpType = z.infer<typeof SignUpSchema>;

// Schema for validating the input for a sign in form
export const SignInSchema = z.object({
	email: emailValidation,
	password: passwordValidation,
});

export type SignInFormProps = {
	label: string;
	type: HTMLInputTypeAttribute;
	name: "email" | "password";
	placeholder: string;
};

// Type representing the shape of an object that conforms to the SignInFormSchema
export type SignInType = z.infer<typeof SignInSchema>;

// Schema for validating the input for a user profile form
export const UserProfileFormSchema = z.object({
	email: emailValidation,
	username: usernameValidation,
	full_name: z.string(),
});

// Type representing the shape of an object that conforms to the UserProfileFormSchema
export type UserProfileFormProps = z.infer<typeof UserProfileFormSchema>;

// Schema for validating the input for a password reset form
export const ForgotPasswordFormSchema = z.object({
	password: passwordValidation,
	confirmpassword: passwordValidation,
});

// Type representing the shape of an object that
export type ForgortType = z.infer<typeof ForgotPasswordFormSchema>;

export type ProfileFormProps = {
	label: string;
	name: "email" | "username" | "full_name";
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	disabled?: boolean;
};

export type TurfFormProps = {
	label: string;
	name: "turf_name" | "location" | "price_per_hour" | "capacity";
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	val?: boolean;
};

export const TurfProfileSchema = z.object({
	turf_name: z.string(),
	location: z.string(),
	price_per_hour: z.number(),
	capacity: z.number(),
});

export type TurfProfileType = z.infer<typeof TurfProfileSchema>;

//
export const BookingSchema = z.object({
	date: z.string(),
	start_time: z.string(),
	end_time: z.string(),
});

export type BookingFormProps = {
	label: string;
	name: "date" | "start_time" | "end_time";
	type: HTMLInputTypeAttribute;
};

export type BookingType = z.infer<typeof BookingSchema>;
