import Form from '@components/FormComponent';
import { ForgotformFields } from '@content/contents';
import useHelper from '@hooks/useHelper';
import dynamic from 'next/dynamic';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));

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
