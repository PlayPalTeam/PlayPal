import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from "./index";

interface FormValues {
	// Define the fields and their types in the form
}

const schema = z.object({});

interface Props {
	onSubmit: SubmitHandler<FormData>;
	formFields: { name: string; label: string; type: string }[];
	buttonType: "submit" | "reset" | "button";
	buttonText: string;
}

const FormComponent = ({
	onSubmit,
	formFields,
	buttonText,
	buttonType,
}: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{formFields.map((field) => (
				<Input
					key={field.name}
					label={field.label}
					name={field.name}
					type={field.type}
					register={register}
					errors={errors}
				/>
			))}
			<Button type={buttonType} text={buttonText} isSubmitting={isSubmitting} />
		</form>
	);
};

export default FormComponent;
