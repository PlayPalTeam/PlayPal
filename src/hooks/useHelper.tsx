import { useSupabaseClient } from '@supabase/auth-helpers-react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ResetData, ForgotPasswordData } from '../types/types';
import { useUserProfile } from '@context/UserProfileContext';

const useHelper = () => {
  const { push } = useRouter();
  const { userProfile } = useUserProfile();

  const supabase = useSupabaseClient();

  const ErrorMessage = ({ message }: { message: string }) => {
    return toast.error(message);
  };

  const SuccessMessage = ({ message }: { message: string }) => {
    return toast.success(message);
  };

  const onResetSubmit: SubmitHandler<ResetData> = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.email, {
      redirectTo: 'http://localhost:3000/auth/forgot'
    });

    if (error) {
      ErrorMessage({ message: error.message });
    }

    SuccessMessage({ message: 'Check your email' });
  };

  const onPasswordSubmit: SubmitHandler<ForgotPasswordData> = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      ErrorMessage({ message: 'Passwords must match' });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      ErrorMessage({ message: error.message });
    }

    SuccessMessage({ message: 'Password reset successful!' });
    push('/auth/signin');
  };

  const getRoleHref = (route: string) => {
    if (!route) {
      return userProfile?.role === 'lister' ? '/lister' : '/user';
    }
    return userProfile?.role === 'lister' ? `/lister/${route}` : `/user/${route}`;
  };

  const convertTime = (value: string) => {
    return moment(value, 'HH:mm:ss').format('h:mm A');
  };

  const createOneHourSlot = (startTime: string, endTime: string, times: string[]): Array<{ value: string; label: string; disabled: boolean }> => {
    const SlotOption = [];
    const start = new Date(`2023-02-18T${startTime}`);
    const end = new Date(`2023-02-18T${endTime}`);
    let current = start;

    while (current <= end) {
      const endHour = new Date(current.getTime() + 60 * 60 * 1000).getHours();
      const label = convertTime(current.toTimeString().slice(0, 8)) + ' - ' + convertTime(endHour + ':00:00');
      const disabled = times.includes(label);
      SlotOption.push({
        value: label,
        label: label,
        isDisabled: disabled
      });
      current = new Date(current.getTime() + 60 * 60 * 1000); // add one hour
      if (current >= end) break; // break if current time is past the end time
    }

    return SlotOption;
  };

  return {
    onResetSubmit,
    onPasswordSubmit,
    getRoleHref,
    ErrorMessage,
    SuccessMessage,
    createOneHourSlot,
    convertTime
  };
};

export default useHelper;
