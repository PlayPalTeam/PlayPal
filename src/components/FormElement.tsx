import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

interface FormLabelProps {
  name: string;
  label: string;
  children?: React.ReactNode;
  placeholder?: string;
}

interface FormInputProps extends FormLabelProps {
  type?: React.HTMLInputTypeAttribute;
  onUpload?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

interface FormMultiSelectProps extends FormLabelProps {
  options: Array<{ value: string; label: string }>;
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

const FormInput = ({ name, label, type = 'text', onUpload }: FormInputProps) => {
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
        onChange={onUpload}
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

const FormMultiSelect = ({ label, name, options }: FormMultiSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <CreatableSelect
          options={options}
          isMulti
          {...field}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'black',
              padding: '5px'
            })
          }}
        />
      )}
    />
  );
};

export { FormInput, FormTextarea, FormMultiSelect };
