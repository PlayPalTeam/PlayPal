import Button from '@/components/Button';
import { FormInput, FormSelect, FormTitle } from '@/components/FormElement';
import { supabase } from '@/lib/supabase';
import { SignUpSchema, SignUpType } from '@/types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const options = [
  { label: 'I want to book places', value: 'user' },
  { label: 'I want to list my places', value: 'lister' }
];

const SignUp = () => {
  const method = useForm<SignUpType>({ resolver: yupResolver(SignUpSchema) });

  const onSignUpSubmit: SubmitHandler<SignUpType> = async (data) => {
    const {
      error,
      data: { user }
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          role: data.role.value
        },
        emailRedirectTo: 'https://playpal.vercel.app/auth/signin'
      }
    });

    if (error) {
      toast.error(error.message);
    }

    method.reset();
    toast.success('Check your email');
    setTimeout(() => {
      window.close(); // close the tab after success
    }, 3000);
  };

  return (
    <main className="mx-auto my-10 w-[80%] max-w-[30rem] ">
      <FormProvider {...method}>
        <form className="mb-4 space-y-5">
          <FormTitle title="Sign Up" />
          <div className="flex items-center gap-x-5 max-md:flex-col max-md:gap-y-5">
            <FormInput
              name="username"
              label="Username"
              placeholder="Enter the username you want.."
            />
          </div>
          <div className="flex items-center gap-x-5 max-md:flex-col max-md:gap-y-5">
            <FormInput
              name="password"
              label="Password"
              type={'password'}
              placeholder="Enter your password..."
            />
            <FormInput
              name="confirm_password"
              label="Retype Password"
              type={'password'}
              placeholder="Enter your password..."
            />
          </div>
          <FormInput name="email" label="Email" type="email" placeholder="Enter your email..." />
          <FormSelect name="role" label="Role" options={options} />
          <Button
            text="Sign Up"
            type="submit"
            onClick={method.handleSubmit(onSignUpSubmit)}
            disabled={method.formState.isSubmitting}
          />
        </form>
      </FormProvider>
      <div className="border-t-2 pt-4">
        <Link prefetch={false} className="btn-block btn" href={'signin'}>
          Already have an account? Sign In
        </Link>
      </div>
    </main>
  );
};
export default SignUp;
