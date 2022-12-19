import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { InputProps } from "../types/types";

const Input = ({ label, type, register, name }: InputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<label className="" htmlFor={label}>
				{label}
			</label>
			<div className="relative flex items-center">
				<input
					className="form-input mt-1 w-full rounded-lg border-green-500 focus:ring-green-600"
					type={type === "password" && showPassword ? "text" : type}
					{...register(name, { required: true })}
				/>
				{type === "password" && (
					<button
						className="absolute right-4 top-3"
						onClick={handleShowPassword}
						type="button"
					>
						{showPassword ? (
							<AiFillEyeInvisible className="h-6 w-6" />
						) : (
							<AiFillEye className="h-6 w-6" />
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default Input;
