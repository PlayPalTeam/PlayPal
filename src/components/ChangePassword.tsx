import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { HTMLInputTypeAttribute, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ForgotPasswordData, ForgotPasswordSchema } from '../types/types';
import Button from './Button';

interface FormField {
  label: string;
  name: 'password' | 'confirmPassword';
  placeholder: string;
  type: HTMLInputTypeAttribute;
  error: any;
}

const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema)
  });

  const supabase = useSupabaseClient();

  const router = useRouter();

  const submit: SubmitHandler<ForgotPasswordData> = async ({
    password,
    confirmPassword
  }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match", {
        duration: 5000,
        style: {
          border: '1px solid red',
          color: 'red'
        }
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    reset();

    if (error) {
      toast.error(error.message, {
        duration: 5000,
        style: {
          border: '1px solid red',
          color: 'red'
        }
      });
    }

    toast.success('Password reset successful!', {
      duration: 5000,
      style: {
        border: '1px solid green',
        color: 'green'
      }
    });

    router.push('/auth/signin');
  };

  const handlePasswordShow = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const handleconfirmPasswordShow = useCallback(() => {
    setconfirmPasswordVisible(!confirmPasswordVisible);
  }, [confirmPasswordVisible]);

  const formFields: FormField[] = [
    {
      label: 'Old Password',
      name: 'password',
      placeholder: 'e.g. steven@12',
      type: passwordVisible ? 'text' : 'password',
      error: errors.password
    },
    {
      label: 'New Password',
      name: 'confirmPassword',
      placeholder: 'e.g. steven@12',
      type: confirmPasswordVisible ? 'text' : 'password',
      error: errors.confirmPassword
    }
  ];

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-[90%] max-w-sm space-y-5"
        onSubmit={handleSubmit(submit)}
      >
        {formFields.map((field) => (
          <div key={field.name}>
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <div className="relative flex items-center">
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className={`inputCss text-lg caret-green-600`}
                {...register(field.name)}
              />
              {field.name === 'password' && (
                <button
                  type="button"
                  className="absolute right-2"
                  onClick={handlePasswordShow}
                >
                  {passwordVisible ? (
                    <AiFillEye className="h-6 w-6" />
                  ) : (
                    <AiFillEyeInvisible className="h-6 w-6" />
                  )}
                </button>
              )}

              {field.name === 'confirmPassword' && (
                <button
                  type="button"
                  className="absolute right-2"
                  onClick={handleconfirmPasswordShow}
                >
                  {confirmPasswordVisible ? (
                    <AiFillEye className="h-6 w-6" />
                  ) : (
                    <AiFillEyeInvisible className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
            {field.error && (
              <p className="mt-1 text-xs italic text-red-500">
                {field.error.message}
              </p>
            )}
          </div>
        ))}

        <Button
          type="submit"
          text="Reset Password"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
