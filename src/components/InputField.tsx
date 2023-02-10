import { forwardRef, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

const Label = ({ id, children }) => (
  <label className="label" htmlFor={id}>
    <span className="label-text">{children}</span>
  </label>
);

const InputField = forwardRef<HTMLInputElement, InputProps>(({ label, name, type, placeholder }, ref) => {
  const style = () => {
    switch (type) {
      case 'text':
        return 'input-bordered input-primary input';
      case 'file':
        return 'file-input file-input-bordered file-input-primary w-full max-w-xs';
      default:
        return '';
    }
  };
  return (
    <div>
      <Label id={name}>{label}</Label>
      <input className={style()} id={name} name={name} type={type} placeholder={placeholder} ref={ref} />
    </div>
  );
});

InputField.displayName = 'Input';

export default InputField;
