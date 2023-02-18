import { ForgotPasswordFormPassword, ResetFormProps, SignInFormProps, SignUpFormProps } from '../types/types';

const SignUpForm: SignUpFormProps[] = [
  {
    label: 'Username',
    type: 'text',
    placeholder: 'e.g. StevenKing@12',
    name: 'username'
  },
  {
    label: 'Email',
    type: 'email',
    placeholder: 'e.g. stevenking@gmail.com',
    name: 'email'
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'e.g. StevenKing@12',
    name: 'password'
  },
  {
    label: 'Role',
    type: 'select',
    name: 'role',
    options: [
      { value: 'lister', label: 'List your Turf' },
      { value: 'user', label: 'Use the app' }
    ]
  }
];

const SignInForm: SignInFormProps[] = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'e.g. stevenking@gmail.com',
    name: 'email'
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'e.g. StevenKing@12',
    name: 'password'
  }
];

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

export { SignInForm, SignUpForm, ResetPasswordForm, ForgotformFields };
