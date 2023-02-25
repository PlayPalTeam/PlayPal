import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '@lib/supabase';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { EmailInputSchema, EmailInputType } from 'src/types/types';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const Button = dynamic(() => import('@components/Button'));

const ResetPasswordLink = () => {
  const method = useForm<EmailInputType>({ resolver: yupResolver(EmailInputSchema) });

  const onResetSubmit: SubmitHandler<EmailInputType> = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.email, {
      redirectTo: 'http://localhost:3000/auth/forgot'
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email');
      setTimeout(() => {
        window.close(); // close the tab after success
      }, 3000);
    }
  };

  return (
    <main className="form-control mx-auto h-screen w-[80%] max-w-sm justify-center space-y-5">
      <div className="space-y-5">
        <FormProvider {...method}>
          <FormTitle title="Reset Password" />
          <FormInput name="email" label="Email" placeholder="Enter your email" />
          <Button text="Send Link" type="submit" disabled={method.formState.isSubmitting} onClick={method.handleSubmit(onResetSubmit)} />
        </FormProvider>
        <div className="border-t-2 pt-4">
          <Link className="btn-block btn" href="signin">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordLink;
