import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

export interface SignInForm {
	email: string;
	password: string;
}

export interface SignUpForm {
	username: string;
	email: string;
	password: string;
	role: string;
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
}
