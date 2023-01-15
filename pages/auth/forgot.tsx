import { Form, FormTitle } from "../../src/components";
import { ForgotformFields } from "../../src/content/contents";
import useHelper from "../../src/utils/helper";

const ForgotPassword = () => {
	const { onPasswordSubmit } = useHelper();
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="formCss">
				<FormTitle title="Reset Password" />
				<Form
					formFields={ForgotformFields}
					onSubmit={onPasswordSubmit}
					form={"PasswordChange"}
					buttonType={"button"}
					buttonText={"Reset Password"}
					className="mb-5"
				/>
			</div>
		</div>
	);
};

export default ForgotPassword;
