interface FormTitleProps {
	title: string;
}

const FormTitle = ({ title }: FormTitleProps) => {
	return (
		<h1 className="text-center text-xl font-bold text-gray-700">{title}</h1>
	);
};

export default FormTitle;
