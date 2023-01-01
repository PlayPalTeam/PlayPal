import { useState } from "react";
import ShowHideButton from "./ShowHideButton";

interface Props {
	label: string;
	name: string;
	type: string;
	placeholder: string;
	register: (name: string) => { name: string };
	errors: any;
	className: string;
}

const Input = ({
	label,
	name,
	type,
	register,
	errors,
	className,
	placeholder,
}: Props) => {
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
					{...register(name)}
				/>
				{type === "password" && (
					<ShowHideButton
						handleShowPassword={toggleShowPassword}
						showPassword={showPassword}
					/>
				)}
			</div>
			{errors[name] && <p>{errors[name].message}</p>}
		</div>
	);
};

export default Input;
