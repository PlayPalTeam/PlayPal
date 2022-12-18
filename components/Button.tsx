import { ButtonProps } from "../types/types";

const Button = ({ children, type, className }: ButtonProps) => {
	return (
		<button className={className} type={type}>
			{children}
		</button>
	);
};

export default Button;
