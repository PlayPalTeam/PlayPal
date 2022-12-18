import { InputProps } from "../types";

const Input = ({ label, type, register, name }: InputProps) => {
	return (
		<div>
			<label htmlFor={label}>{label}</label>
			<input
				className="form-input w-full rounded-lg focus:ring-green-600"
				type={type}
				{...register(name, { required: true })}
			/>
		</div>
	);
};

export default Input;
