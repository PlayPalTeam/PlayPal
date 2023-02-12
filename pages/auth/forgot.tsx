import Form from '@components/FormComponent';
import FormTitle from '@components/FormTitle';
import { ForgotformFields } from '@content/contents';
import useHelper from '@hooks/useHelper';

const ForgotPassword = () => {
  const { onPasswordSubmit } = useHelper();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="formCss">
        <FormTitle title="Reset Password" />
        <Form
          formFields={ForgotformFields}
          onSubmit={onPasswordSubmit}
          form={'PasswordChange'}
          buttonType={'button'}
          buttonText={'Reset Password'}
          className="mb-5"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
