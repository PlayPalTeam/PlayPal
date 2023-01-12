import { HTMLInputTypeAttribute, useState } from "react";
import { InputCommonProps } from "../types/types";
import ShowHideButton from "./ShowHideButton";

interface InputProps extends InputCommonProps {
	type: HTMLInputTypeAttribute;
	valueAsNumber: boolean;
}

const Input = ({
	label,
	name,
	type,
	register,
	errors,
	className,
	placeholder,
	valueAsNumber
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div className={`${className}`}>
			<label className="mb-2 block font-bold text-gray-700" htmlFor={name}>
				{label}
			</label>
			<div className="relative">
				<input
					type={type === "password" && showPassword ? "text" : type}
					name={name}
					placeholder={placeholder}
					className="inputCss"
					{...register(name, {valueAsNumber: valueAsNumber})}
				/>
				{type === "password" && (
					<ShowHideButton
						handleShowPassword={toggleShowPassword}
						showPassword={showPassword}
					/>
				)}
			</div>
			{errors[name] && (
				<p className="text-xs text-red-500">{errors[name].message}</p>
			)}
		</div>
	);
};

export default Input;
