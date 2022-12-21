import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

export interface SignInForm {
	username: string;
	password: string;
}

export interface SignUpForm {
	username: string;
	email: string;
	password: string;
	role: string;
}

export interface InputProps<T> {
	label: string;
	register: UseFormRegister<T>;
	type: HTMLInputTypeAttribute;
	name: "email" | "password" | "role" | "username";
}

export interface Option {
	value: string;
	label: string;
}

export interface SelectInputProps {
	label: string;
	register: UseFormRegister<SignUpForm>;
	options: Option[];
}

export interface ButtonProps {
	type: "button" | "reset" | "submit";
	children: any;
	className: string;
}

export interface UserProfile {
	username: string;
	full_name: string;
	avatar_url: string;
	role: string;
}
