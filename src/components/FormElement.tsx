import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface FormLabelProps {
  name: string;
  label: string;
  children?: React.ReactNode;
}

interface FormInputProps extends Omit<FormLabelProps, 'children'> {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  className?: string;
}

interface FormSelectProps extends Omit<FormLabelProps, 'children'> {
  options: Array<{ value: string; label: string }>;
  isMulti?: boolean;
}

interface FormTitleProps {
  title: string;
}

const FormTitle = ({ title }: FormTitleProps) => {
  return <h1 className="mb-4 text-center text-4xl">{title}</h1>;
};

const FormLabel = ({ name, label, children }: FormLabelProps) => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <div className="w-full">
      <label className="label" htmlFor={name}>
        <span>{label}</span>
      </label>
      {children}
      {errors[name] && <>{errors[name].message}</>}
    </div>
  );
};

const FormInput = ({ name, label, type = 'text', placeholder, defaultValue, disabled, className }: FormInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <FormLabel name={name} label={label}>
      <div className="relative">
        <input
          className={`${type === 'file' ? 'file-input-bordered file-input' : 'input'} w-full  ${
            errors[name] ? 'input-error' : 'input-primary'
          } ${className}`}
          type={showPassword ? 'text' : type}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          {...register(name)}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute top-1 right-2 p-2"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="sr-only">{showPassword ? 'Hide' : 'Show'}</span>
            {showPassword ? <AiFillEyeInvisible className="h-6 w-6" /> : <AiFillEye className="h-6 w-6" />}
          </button>
        )}
      </div>
    </FormLabel>
  );
};

const FormTextarea = ({ name, label }: FormLabelProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <FormLabel name={name} label={label}>
      <textarea className={`textarea w-full resize-none  ${errors[name] ? 'textarea-error' : 'textarea-primary'}`} id={name} {...register(name)} />
    </FormLabel>
  );
};

/**
 * A select field component that uses the react-select and react-hook-form libraries.
 * You can add your own option if not available
 *
 * @param {object} props - The props object for the component.
 * @param {string} props.label - The label for the select field.
 * @param {string} props.name - The name of the select field, which will be used as the identifier for the field in the form data.
 * @param {object[]} props.options - An array of objects representing the selectable options in the select field. Each object should have a `value` property and a `label` property that will be displayed in the select field.
 * @param {boolean} props.isMulti - A boolean value indicating whether the select field should allow multiple selections.
 * @returns {JSX.Element} A component that renders a select field with the given label and options.
 */
const FormMultiSelect = ({ label, name, options, isMulti }: FormSelectProps): JSX.Element => {
  const { control } = useFormContext();

  return (
    <FormLabel name={name} label={label}>
      <Controller name={name} control={control} render={({ field }) => <CreatableSelect options={options} isMulti={isMulti} {...field} />} />
    </FormLabel>
  );
};

const FormSelect = ({ label, name, options }: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <FormLabel name={name} label={label}>
      <Controller name={name} control={control} render={({ field }) => <Select isSearchable={false} options={options} {...field} />} />
    </FormLabel>
  );
};

export { FormTitle, FormInput, FormTextarea, FormMultiSelect, FormSelect };
