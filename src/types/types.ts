import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

export type names =
	| "role"
	| "email"
	| "date"
	| "password"
	| "username"
	| "start_time"
	| "end_time"
	| "player_needed"
	| "turf_id"
	| "game"
	| "game_date"
	| "confirmPassword";

export interface InputCommonProps {
	name: names;
	label: string;
	placeholder: string;
	register: UseFormRegister<
		SignInData | SignUpData | BookingType | RequestData
	>;
	className?: string;
	errors?: any;
}

// Validates that the input is a non-empty string with at least 3 characters
const usernameValidation = z
	.string()
	.min(3, "Username must be more than 3 characters");

// Validates that the input is a non-empty string that is a valid email address
const emailValidation = z.string().email({ message: "Invalid email address" });

// Validates that the input is a non-empty string that is at least 8 characters long
// contains at least one uppercase letter, one lowercase letter, one number, and one special character
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
	role: z.enum(["user", "lister"]),
});

export interface SignUpFormProps {
	label: string;
	type: HTMLInputTypeAttribute;
	name: "username" | "email" | "password" | "role";
	placeholder?: string;
	options?: { value: string; label: string }[];
}

// Type representing the shape of an object that conforms to the SignUpFormSchema
export type SignUpData = z.infer<typeof SignUpSchema>;

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
export type SignInData = z.infer<typeof SignInSchema>;

// Schema for validatiSignInDatang the input for a user profile form
export const UserProfileSchema = z.object({
	username: usernameValidation,
	full_name: z.string(),
});

// Type representing the shape of an object that conforms to the UserProfileFormSchema
export type UserProfileData = z.infer<typeof UserProfileSchema>;

// Schema for validating the input for a password reset form
export const ForgotPasswordSchema = z.object({
	password: passwordValidation,
	confirmPassword: passwordValidation,
});

export interface ForgotPasswordFormPassword {
	label: string;
	name: "password" | "confirmPassword";
	placeholder: string;
	type: HTMLInputTypeAttribute;
}

// Type representing the shape of an object that conforms to the ForgotPasswordSchema
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;

export type ProfileFormProps = {
	label: string;
	name: "email" | "username" | "full_name";
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	disabled?: boolean;
};

export type TurfFormProps = {
	label: string;
	name:
		| "turf_name"
		| "location"
		| "price_per_hour"
		| "capacity"
		| "description";
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	val?: boolean;
};

export const TurfProfileSchema = z.object({
	turf_name: z.string(),
	location: z.string(),
	price_per_hour: z.number(),
	capacity: z.number(),
	description: z.string(),
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

export const RequestSchema = z.object({
	player_needed: z.number().positive(),
	turf_id: z.string(),
	game: z.string(),
	game_date: z.string(),
});

export interface RequestFormProps {
	label: string;
	name: "player_needed" | "turf_id" | "game" | "game_date";
	type: "select" | "text";
	options?: { value: string; label: string }[];
	valueAsNumber?: boolean;
}

export type RequestData = z.infer<typeof RequestSchema>;

export const ResetSchema = z.object({
	email: emailValidation,
});

export interface ResetFormProps {
	label: string;
	name: "email";
	type: "email";
}

export type ResetData = z.infer<typeof ResetSchema>;
