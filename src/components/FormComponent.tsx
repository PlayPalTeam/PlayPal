import { SubmitHandler, useForm } from 'react-hook-form';
import { RequestData, RequestSchema, ResetSchema, names, ForgotPasswordSchema, registerType, ForgotPasswordData, ResetData } from '../types/types';
import { HTMLInputTypeAttribute } from 'react';
import Button from './Button';
import Input from './Input';
import SelectInput from './SelectInput';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormProps {
  formFields: {
    name: names;
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    valueAsNumber?: boolean;
    options?: { value: string; label: string }[];
  }[];
  onSubmit: SubmitHandler<ForgotPasswordData | ResetData | RequestData>;
  form: 'SignUp' | 'Request' | 'Reset' | 'PasswordChange';
  buttonType: 'submit' | 'reset' | 'button';
  buttonText: string;
  className?: string;
}

const Form = ({ onSubmit, formFields, buttonText, buttonType, form, className }: FormProps) => {
  const formSchemas = {
    Request: RequestSchema,
    Reset: ResetSchema,
    PasswordChange: ForgotPasswordSchema
  };
  const schema = formSchemas[form];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<registerType>({
    resolver: yupResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field) => (
        <div key={field.name}>
          {field.type === 'select' ? (
            <SelectInput
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              register={register}
              errors={errors}
              options={field.options}
            />
          ) : (
            <Input
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              register={register}
              errors={errors}
              className={className}
              valueAsNumber={field.valueAsNumber}
            />
          )}
        </div>
      ))}
      <Button type={buttonType} text={buttonText} disabled={isSubmitting} />
    </form>
  );
};

export default Form;
