import { useState, memo, useCallback, useMemo } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({ label, type, name, register }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const inputClassName = useMemo(() => {
		return "form-input mt-1 w-full rounded-lg border-green-500 focus:ring-green-600";
	}, []);

	const iconClassName = useMemo(() => {
		return "h-6 w-6";
	}, []);

	return (
		<div>
			<label htmlFor={label}>{label}</label>
			<div className="relative flex items-center">
				<input
					className={inputClassName}
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
							<AiFillEyeInvisible className={iconClassName} />
						) : (
							<AiFillEye className={iconClassName} />
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default memo(Input);
