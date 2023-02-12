import Form from '@components/FormComponent';
import FormTitle from '@components/FormTitle';
import { SignUpForm } from '@content/contents';
import useHelper from '@hooks/useHelper';
import Head from 'next/head';
import Link from 'next/link';

const SignUp = () => {
  const { onSignUpSubmit } = useHelper();

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className="form-control mx-auto h-screen max-w-[22rem] justify-center">
        <div>
          <FormTitle title="PlayPal | SignUp" />
          <Form
            formFields={SignUpForm}
            onSubmit={onSignUpSubmit}
            form={'SignUp'}
            buttonType={'submit'}
            buttonText={'SignUp'}
            className="mb-5"
          />
          <div className="link-hover mt-5 text-center font-medium">
            <Link href="/auth/signin">Already have an account? Sign In</Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default SignUp;
