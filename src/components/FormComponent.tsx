import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, SelectInput } from "./index";
import {
	SignInSchema,
	SignInData,
	SignUpSchema,
	SignUpData,
	BookingSchema,
	BookingType,
	RequestData,
	RequestSchema,
	ResetSchema,
	names,
	ForgotPasswordSchema,
	TurfProfileSchema,
	TurfProfileType,
	ForgotPasswordData,
	ResetData,
	registerType,
} from "../types/types";
import { HTMLInputTypeAttribute } from "react";

interface FormProps {
	formFields: {
		name: names;
		label: string;
		type: HTMLInputTypeAttribute;
		placeholder?: string;
		valueAsNumber?: boolean;
		options?: { value: string; label: string }[];
	}[];
	onSubmit: SubmitHandler<
		SignInData | SignUpData | BookingType | RequestData | TurfProfileType
	>;
	form:
		| "SignIn"
		| "SignUp"
		| "Booking"
		| "Request"
		| "Reset"
		| "PasswordChange"
		| "Listing";
	buttonType: "submit" | "reset" | "button";
	buttonText: string;
	className?: string;
}

const Form = ({
	onSubmit,
	formFields,
	buttonText,
	buttonType,
	form,
	className,
}: FormProps) => {
	const formSchemas = {
		SignIn: SignInSchema,
		SignUp: SignUpSchema,
		Booking: BookingSchema,
		Request: RequestSchema,
		Reset: ResetSchema,
		PasswordChange: ForgotPasswordSchema,
		Listing: TurfProfileSchema,
	};
	const schema = formSchemas[form];

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<registerType>({
		resolver: zodResolver(schema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{formFields.map((field) => (
				<div key={field.name}>
					{field.type === "select" ? (
						<SelectInput
							label={field.label}
							name={field.name}
							placeholder={field.placeholder}
							register={register}
							errors={errors}
							options={field.options}
						/>
					) : (
						<Input
							label={field.label}
							name={field.name}
							placeholder={field.placeholder}
							type={field.type}
							register={register}
							errors={errors}
							className={className}
							valueAsNumber={field.valueAsNumber}
						/>
					)}
				</div>
			))}
			<Button type={buttonType} text={buttonText} isSubmitting={isSubmitting} />
		</form>
	);
};

export default Form;
