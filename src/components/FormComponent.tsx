import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, SelectInput } from "./index";
import {
	SignInFormProps,
	SignInSchema,
	SignInType,
	SignUpFormProps,
	SignUpSchema,
	SignUpType,
} from "../types/types";
import { HTMLInputTypeAttribute } from "react";

interface FormProps {
	formFields: {
		name:
			| "email"
			| "password"
			| "username"
			| "role"
			| "date"
			| "start-time"
			| "end-time"
			| "player";
		label: string;
		placeholder?: string;
		type: HTMLInputTypeAttribute;
		options?: { value: string; label: string }[];
	}[];
	onSubmit: SubmitHandler<SignInType | SignUpType>;
	form: "SignIn" | "SignUp";
	buttonType: "submit" | "reset" | "button";
	buttonText: string;
	className?: string;
	valueAsDate?: boolean;
	valueAsNumber?: boolean;
}

const Form = ({
	onSubmit,
	formFields,
	buttonText,
	buttonType,
	form,
	className,
}: FormProps) => {
	const schema =
		(form === "SignIn" && SignInSchema) || (form === "SignUp" && SignUpSchema);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInType | SignUpType>({
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
						/>
					)}
				</div>
			))}
			<Button type={buttonType} text={buttonText} isSubmitting={isSubmitting} />
		</form>
	);
};

export default Form;
