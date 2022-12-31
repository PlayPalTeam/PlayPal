import { useState } from "react";
import ShowHideButton from "./ShowHideButton";

interface Props {
	label: string;
	name: string;
	type: string;
	register: (name: string) => { name: string };
	errors: any;
}

const Input = ({ label, name, type, register, errors }: Props) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type === "password" && showPassword ? "text" : type}
				name={name}
				className="inputCss"
				{...register(name)}
			/>
			{errors[name] && <p>{errors[name].message}</p>}
			{type === "password" && (
				<ShowHideButton
					handleShowPassword={toggleShowPassword}
					showPassword={showPassword}
				/>
			)}
		</div>
	);
};

export default Input;
