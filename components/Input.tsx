import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	error?: string;
	register?: any;
	wrapperClass?: string;
}

const Input = ({
	register,
	name,
	error,
	label,
	wrapperClass,
	...rest
}: InputProps) => {
	return (
		<div className={wrapperClass}>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				aria-invalid={error ? "true" : "false"}
				{...register(name)}
				{...rest}
			/>
			{error && <span role="alert" className="text-red-500 text-sm">{error}</span>}
		</div>
	);
};

export default Input;
