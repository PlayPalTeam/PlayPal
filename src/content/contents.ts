import { ForgotPasswordFormPassword, ResetFormProps } from '../types/types';

const ResetPasswordForm: ResetFormProps[] = [
  {
    label: 'Email',
    type: 'email',
    name: 'email'
  }
];

const ForgotformFields: ForgotPasswordFormPassword[] = [
  {
    label: 'Password',
    name: 'password',
    placeholder: 'e.g. steven@12',
    type: 'password'
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'e.g. steven@12',
    type: 'password'
  }
];

export { ResetPasswordForm, ForgotformFields };
