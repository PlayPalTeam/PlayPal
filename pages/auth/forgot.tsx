import Button from '@/components/Button';
import { FormInput, FormTitle } from '@/components/FormElement';
import { supabase } from '@/lib/supabase';
import { PasswordSchema, type PasswordType } from '@/types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
    <div className="mx-auto my-28 w-[80%] max-w-[22rem]">
      <FormProvider {...method}>
        <form className="space-y-5">
          <FormTitle title="Reset Password" />
          <FormInput name="password" label="Password" placeholder="Enter 8 character password" />
          <FormInput name="confirm_p" label="Retype {'password'}" />
          <FormInput
            name="confirm_password"
            placeholder="Retype password"
            type={'password'}
            label={''}
          />
          <Button text="Reset Password" type="submit" />
          <Button
            text="Reset Password"
            type="submit"
            disabled={method.formState.isSubmitting}
            onClick={method.handleSubmit(onPasswordSubmit)}
          />
          <FormInput
            name="confirm_password"
            label="Retype Password"
            placeholder="Retype password"
            type={'password'}
          />
          <Button
            text="Reset Password"
            type="submit"
            disabled={method.formState.isSubmitting}
            onClick={method.handleSubmit(onPasswordSubmit)}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;
