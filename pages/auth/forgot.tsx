import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '@lib/supabase';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PasswordSchema, PasswordType } from 'src/types/types';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const Button = dynamic(() => import('@components/Button'));

const ForgotPassword = () => {
  const method = useForm<PasswordType>({ resolver: yupResolver(PasswordSchema) });
  const { push } = useRouter();

  const onPasswordSubmit: SubmitHandler<PasswordType> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password reset successful!');
      push('signin');
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="form-control mx-auto h-screen w-[80%] max-w-sm justify-center">
        <div className="space-y-5">
          <FormProvider {...method}>
            <FormTitle title="Reset Password" />
            <FormInput name="password" label="Password" placeholder="Enter 8 character password" type={'password'} />
            <FormInput name="confirm_password" label="Retype Password" placeholder="Retype password" type={'password'} />
            <Button text="Reset Password" type="submit" disabled={method.formState.isSubmitting} onClick={method.handleSubmit(onPasswordSubmit)} />
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
