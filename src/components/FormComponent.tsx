import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, SelectInput } from "./index";
import {
	SignInFormProps,
	SignInschema,
	SignUpFormProps,
	SignUpschema,
} from "../types/types";

interface FormProps {
	formFields: {
		name: string;
		label: string;
		placeholder?: string;
		type: string;
		options?: { value: string; label: string }[];
	}[];
	onSubmit: SubmitHandler<SignInFormProps | SignUpFormProps>;
	form: "SignIn" | "SignUp";
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
	const schema = form === "SignIn" ? SignInschema : SignUpschema;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormProps | SignUpFormProps>({
		resolver: zodResolver(schema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{formFields.map((field) => (
				<>
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
							key={field.name}
							label={field.label}
							name={field.name}
							placeholder={field.placeholder}
							type={field.type}
							register={register}
							errors={errors}
							className={className}
						/>
					)}
				</>
			))}
			<Button type={buttonType} text={buttonText} isSubmitting={isSubmitting} />
		</form>
	);
};

export default Form;
