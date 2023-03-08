import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '@lib/supabase';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { SignUpSchema, SignUpType } from 'src/types/types';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const FormSelect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormSelect));
const Button = dynamic(() => import('@components/Button'));

const options = [
  { label: 'I want to book places', value: 'user' },
  { label: 'I want to list my places', value: 'lister' }
];

const SignUp = () => {
  const method = useForm<SignUpType>({ resolver: yupResolver(SignUpSchema) });

  const redirectURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth/signin' : 'https://playpal.vercel.app/auth/signin';

  const onSignUpSubmit: SubmitHandler<SignUpType> = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          role: data.role.value
        },
        emailRedirectTo: redirectURL
      }
    });

    if (error) {
      toast.error(error.message);
    }

    toast.success('Check your email');
    method.reset();
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className="mx-auto my-10 w-[80%] max-w-[30rem] ">
        <FormProvider {...method}>
          <form className="mb-4 space-y-5">
            <FormTitle title="Sign Up" />
            <div className="flex items-center gap-x-5 max-md:flex-col max-md:gap-y-5">
              <FormInput name="username" label="Username" placeholder="Enter the username you want.." />
            </div>
            <div className="flex items-center gap-x-5 max-md:flex-col max-md:gap-y-5">
              <FormInput name="password" label="Password" type={'password'} placeholder="Enter your password..." />
              <FormInput name="confirm_password" label="Retype Password" type={'password'} placeholder="Enter your password..." />
            </div>
            <FormInput name="email" label="Email" type="email" placeholder="Enter your email..." />
            <FormSelect name="role" label="Role" options={options} />
            <Button text="Sign Up" type="submit" onClick={method.handleSubmit(onSignUpSubmit)} disabled={method.formState.isSubmitting} />
          </form>
        </FormProvider>
        <div className="border-t-2 pt-4">
          <Link className="btn-block btn" href={'signin'}>
            Already have an account? Sign In
          </Link>
        </div>
      </main>
    </>
  );
};
export default SignUp;
