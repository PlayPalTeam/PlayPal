import { useFormContext } from 'react-hook-form';

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
        className={`${type === 'file' ? 'file-input-bordered file-input' : 'input'} w-full ${errors[name] ? 'input-error' : 'input-primary'}`}
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
      <textarea className={`textarea w-full resize-none ${errors[name] ? 'textarea-error' : 'textarea-primary'}`} id={name} {...register(name)} />
    </FormLabel>
  );
};

export { FormInput, FormTextarea };
