import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { object, string, number, InferType, array } from 'yup';

export type names =
  | 'role'
  | 'email'
  | 'date'
  | 'password'
  | 'username'
  | 'start_time'
  | 'end_time'
  | 'player_needed'
  | 'turf_id'
  | 'game'
  | 'game_date'
  | 'confirmPassword';

export type registerType = SignInData | SignUpData | BookingType | RequestData | ForgotPasswordData | ResetData;

export interface InputCommonProps {
  name: names;
  label: string;
  placeholder?: string;
  register: UseFormRegister<registerType>;
  className?: string;
  errors?: any;
}

const usernameValidation = z
  .string()
  .min(3)
  .max(20)
  .trim()
  .regex(/^[a-zA-Z0-9_]+$/);

const emailValidation = z.string().email().trim();

// Validates that the input is a non-empty string that is at least 8 characters long
// contains at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordValidation = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  .regex(new RegExp('.*\\d.*'), 'One number')
  .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'One special character')
  .min(8, 'Must be at least 8 characters in length');

export const SignUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  role: z.enum(['user', 'lister'])
});

export type SignUpData = z.infer<typeof SignUpSchema>;

export interface SignUpFormProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'select';
  name: keyof SignUpData;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Schema for validating the input for a sign in form
export const SignInSchema = z.object({
  email: emailValidation,
  password: passwordValidation
});

export type SignInFormProps = {
  label: string;
  type: HTMLInputTypeAttribute;
  name: 'email' | 'password';
  placeholder: string;
};

// Type representing the shape of an object that conforms to the SignInFormSchema
export type SignInData = z.infer<typeof SignInSchema>;

// Schema for validatiSignInDatang the input for a user profile form
export const UserProfileSchema = z.object({
  username: usernameValidation,
  full_name: z.string(),
  phone_number: z.optional(z.number().positive())
});

// Type representing the shape of an object that conforms to the UserProfileFormSchema
export type UserProfileData = z.infer<typeof UserProfileSchema>;

// Schema for validating the input for a password reset form
export const ForgotPasswordSchema = z.object({
  password: passwordValidation,
  confirmPassword: passwordValidation
});

export interface ForgotPasswordFormPassword {
  label: string;
  name: 'password' | 'confirmPassword';
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

// Type representing the shape of an object that conforms to the ForgotPasswordSchema
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;

export type ProfileFormProps = {
  label: string;
  name: 'email' | 'username' | 'full_name';
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
};

export const BookingSchema = z.object({
  date: z.string(),
  start_time: z.string(),
  end_time: z.string()
});

export type BookingFormProps = {
  label: string;
  name: 'date' | 'start_time' | 'end_time';
  type: HTMLInputTypeAttribute;
};

export type BookingType = z.infer<typeof BookingSchema>;

export const RequestSchema = z.object({
  player_needed: z.number().positive(),
  turf_id: z.string(),
  game: z.string(),
  game_date: z.string()
});

export interface RequestFormProps {
  label: string;
  name: 'player_needed' | 'turf_id' | 'game' | 'game_date';
  type: 'select' | 'text';
  options?: { value: string; label: string }[];
  valueAsNumber?: boolean;
}

export type RequestData = z.infer<typeof RequestSchema>;

export const ResetSchema = z.object({
  email: emailValidation
});

export interface ResetFormProps {
  label: string;
  name: 'email';
  type: 'email';
}

export type ResetData = z.infer<typeof ResetSchema>;

export const AddTurfSchema = object().shape({
  turf_name: string().required('Turf name is required').trim(),
  open_hour: string()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { excludeEmptyString: true })
    .required('Open hour is required'),
  close_hour: string()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { excludeEmptyString: true })
    .required('Close hour is required'),
  price: number().required('Price is required').positive().integer('Enter number'),
  capacity: number().required('Capacity is required').positive().integer(),
  address: string().trim().required('Address is required'),
  description: string().trim().required('Description is required'),
  amenities: array()
    .of(
      object().shape({
        value: string().required(),
        label: string().required()
      })
    )
    .required('Amenities is required'),
  sports: array().of(
    object().shape({
      value: string().required(),
      label: string().required()
    })
  ).required("Sports is required")
});

export type TurfFormValues = InferType<typeof AddTurfSchema>;
