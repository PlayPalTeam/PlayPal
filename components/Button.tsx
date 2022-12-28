import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonType = {
	isSubmitting: boolean;
	text: string;
};

const Button = ({ isSubmitting, text }: ButtonType) => {
	return (
		<button
			type="submit"
			disabled={isSubmitting}
			className="flex w-full items-center justify-center rounded-lg bg-green-500 py-2 font-bold text-white duration-300 ease-in hover:bg-green-600"
		>
			{isSubmitting ? (
				<AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
			) : (
				<p>{text}</p>
			)}
		</button>
	);
};

export default Button;
