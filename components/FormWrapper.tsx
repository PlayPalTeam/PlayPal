import { ReactNode, FC, createElement, memo } from "react";

export type classNameType = string;
export type childrenType = ReactNode;

export interface IFormProps {
	defaultValues?: any;
	children?: childrenType;
	buttonLabel?: string;
	onSubmit?: any;
	handleSubmit?: any;
	register?: any;
	className?: classNameType;
	btnCss?: classNameType;
}

const Form: FC<IFormProps> = ({
	defaultValues,
	buttonLabel = "Submit",
	children,
	onSubmit,
	handleSubmit,
	register,
	btnCss,
	...rest
}) => {
	return (
		<form onSubmit={handleSubmit(onSubmit)} {...rest}>
			{Array.isArray(children)
				? children.map((child) => {
						return child.props.name
							? createElement(child.type, {
									...{
										...child.props,
										register,
										key: child.props.name,
									},
							  })
							: child;
				  })
				: children}
			<button className={btnCss}>{buttonLabel}</button>
		</form>
	);
};

export default memo(Form);
