import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

interface FormLabelProps {
  name: string;
  label: string;
  children?: React.ReactNode;
}

interface FormInputProps extends Omit<FormLabelProps, 'children'> {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

interface FormMultiSelectProps extends Omit<FormLabelProps, 'children'> {
  options: Array<{ value: string; label: string }>;
  isMulti?: boolean;
}

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

const FormInput = ({ name, label, type = 'text', placeholder }: FormInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <FormLabel name={name} label={label}>
      <input
        className={`${type === 'file' ? 'file-input-bordered file-input' : 'input'} w-full focus-within:outline-none ${
          errors[name] ? 'input-error' : 'input-primary'
        }`}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
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
      <textarea
        className={`textarea w-full resize-none focus-within:outline-none ${errors[name] ? 'textarea-error' : 'textarea-primary'}`}
        id={name}
        {...register(name)}
      />
    </FormLabel>
  );
};

const FormMultiSelect = ({ label, name, options, isMulti }: FormMultiSelectProps) => {
  const { control } = useFormContext();

  return (
    <FormLabel name={name} label={label}>
      <Controller name={name} control={control} render={({ field }) => <CreatableSelect options={options} isMulti={isMulti} {...field} />} />
    </FormLabel>
  );
};

export { FormInput, FormTextarea, FormMultiSelect };
