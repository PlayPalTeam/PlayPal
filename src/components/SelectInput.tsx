import { UseFormRegister } from "react-hook-form";
import { SignUpType } from "../types/types";

interface Option {
	value: string;
	label: string;
}

interface SelectInputProps {
	label: string;
	name:
		| "email"
		| "password"
		| "username"
		| "role"
		| "date"
		| "start-time"
		| "end-time"
		| "player";
	placeholder: string;
	register: UseFormRegister<SignUpType>;
	errors: any;
	options: Option[];
}

const SelectInput = ({
	name,
	label,
	options,
	errors,
	placeholder,
	register,
}: SelectInputProps) => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="block text-sm font-medium leading-5 text-gray-700"
			>
				{label}
			</label>
			<select
				name={name}
				id={name}
				{...register(name)}
				placeholder={placeholder}
				className="inputCss"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{errors[name] && <p>{errors[name].message}</p>}
		</div>
	);
};

export default SelectInput;
