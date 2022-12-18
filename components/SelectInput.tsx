import { SelectInputProps } from "../types";

const SelectInput = ({ options, label, register }: SelectInputProps) => {
	return (
		<div>
			<label htmlFor={label}>{label}</label>
			<select
				className="form-select mt-1 w-full rounded-lg focus:ring-green-600"
				id={label}
				{...register("role")}
			>
				{options.map((option) => (
					<option value={option.value} key={option.label}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
