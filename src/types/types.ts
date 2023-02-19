import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { object, string, number, InferType, array, date, ref } from 'yup';

export type names = 'email' | 'password' | 'player_needed' | 'turf_id' | 'game' | 'game_date' | 'confirmPassword';

export type registerType = RequestData | ForgotPasswordData | ResetData;

export interface InputCommonProps {
  name: names;
  label: string;
  placeholder?: string;
  register: UseFormRegister<registerType>;
  className?: string;
  errors?: any;
}

const usernameValidation = string()
  .min(3, 'Minimum 3 character')
  .max(20, 'Maximum 20 character')
  .matches(/^[a-zA-Z0-9_]+$/);

// Validates that the input is a non-empty string that is at least 8 characters long
// contains at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordValidation = string()
  .matches(new RegExp('.*[A-Z].*'), 'One uppercase character')
  .matches(new RegExp('.*[a-z].*'), 'One lowercase character')
  .matches(new RegExp('.*\\d.*'), 'One number')
  .matches(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'One special character')
  .min(8, 'Must be at least 8 characters in length')
  .required('Enter password');

// Schema for validatiSignInDatang the input for a user profile form
export const UserProfileSchema = object({
  username: usernameValidation,
  full_name: string(),
  phone_number: number().positive().integer().optional()
});

// Type representing the shape of an object that conforms to the UserProfileFormSchema
export type UserProfileData = InferType<typeof UserProfileSchema>;

// Schema for validating the input for a password reset form
export const ForgotPasswordSchema = object().shape({
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
export type ForgotPasswordData = InferType<typeof ForgotPasswordSchema>;

export type ProfileFormProps = {
  label: string;
  name: 'email' | 'username' | 'full_name';
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
};

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

export const ResetSchema = object().shape({
  email: string().email().required('Enter email')
});

export interface ResetFormProps {
  label: string;
  name: 'email';
  type: 'email';
}

export type ResetData = InferType<typeof ResetSchema>;

export const SignInSchema = object().shape({
  email: string().email().required('Enter email'),
  password: passwordValidation
});

export type SignInType = InferType<typeof SignInSchema>;

export const SignUpSchema = object().shape({
  username: usernameValidation,
  email: string().email().required('Please enter your email'),
  password: passwordValidation,
  confirm_password: string().oneOf([ref('password'), null], 'Password must match'),
  role: object()
    .shape({
      value: string().required(),
      label: string().required()
    })
    .required('Please select a role')
});

export type SignUpType = InferType<typeof SignUpSchema>;

export const AddTurfSchema = object().shape({
  turf_name: string().trim().required('Please enter a name for the turf'),
  open_hour: string()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid opening time (format: HH:mm)')
    .required('Please enter the opening time for the turf'),
  close_hour: string()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid closing time (format: HH:mm)')
    .required('Please enter the closing time for the turf'),
  price: number()
    .integer('Please enter a whole number for the price')
    .positive('Please enter a positive number for the price')
    .required('Please enter a price for the turf'),
  capacity: number()
    .integer('Please enter a whole number for the capacity')
    .positive('Please enter a positive number for the capacity')
    .required('Please enter a capacity for the turf'),
  address: string().trim().required('Please enter an address for the turf'),
  description: string().trim().required('Please enter a description for the turf'),
  amenities: array()
    .of(
      object().shape({
        value: string().required('Please enter a value for this amenity'),
        label: string().required('Please enter a label for this amenity')
      })
    )
    .required('Please select at least one amenity for the turf'),
  sports: array()
    .of(
      object().shape({
        value: string().required('Please enter a value for this sport'),
        label: string().required('Please enter a label for this sport')
      })
    )
    .required('Please select at least one sport for the turf')
});

export type TurfFormValues = InferType<typeof AddTurfSchema>;

const today = new Date();
today.setHours(0, 0, 0, 0);

export const BookTurfSchema = object().shape({
  date: date().min(today, 'Date must be later than today.').required('Please select a date'),
  slot: array()
    .of(
      object().shape({
        value: string().required(),
        label: string().required()
      })
    )
    .required('Please pick a slot'),
  sport: object()
    .shape({
      value: string().required(),
      label: string().required()
    })
    .required('Select a sports')
});

export type BookTurfType = InferType<typeof BookTurfSchema>;
