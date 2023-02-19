import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '@lib/supabase';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { SignUpSchema, SignUpType } from 'src/types/types';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const FormSelect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormSelect));
const Button = dynamic(() => import('@components/Button'));

const SignUp = () => {
  const method = useForm<SignUpType>({ resolver: yupResolver(SignUpSchema) });

  const redirectURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth/signin' : 'https://myapp.com/auth/signin';

  const onSignUpSubmit: SubmitHandler<SignUpType> = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          role: data.role
        },
        emailRedirectTo: redirectURL
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email');
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className="form-control mx-auto h-screen max-w-[34rem] justify-center space-y-5">
        <FormProvider {...method}>
          <FormTitle title="Sign Up" />
          <div className="flex items-center gap-x-5 max-md:flex-col">
            <FormInput name="username" label="Username" placeholder="Enter the username you want.." />
            <FormInput name="full_name" label="Full Name" placeholder="Enter your full name..." />
          </div>
          <div className="flex items-center gap-x-5 max-md:flex-col">
            <FormInput name="password" label="Password" type={'password'} placeholder="Enter 8 character password..." />
            <FormInput name="confirm_password" label="Retype Password" type={'password'} placeholder="Enter 8 character password..." />
          </div>
          <div>
            <FormInput name="email" label="Email" type="email" placeholder="Enter your email..." />
            <FormSelect name="role" label="Role" options={[]} />
            <Button text="Sugn Up" type="submit" onClick={method.handleSubmit(onSignUpSubmit)} disabled={method.formState.isSubmitting} />
          </div>
        </FormProvider>
      </main>
    </>
  );
};
export default SignUp;
