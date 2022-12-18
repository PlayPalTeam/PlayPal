import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

export interface SignUpForm {
	username: string;
	email: string;
	password: string;
	role: string;
}

export interface InputProps {
	label: string;
	register: UseFormRegister<SignUpForm>;
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
