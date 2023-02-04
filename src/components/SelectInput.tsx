import { InputCommonProps } from '../types/types';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps extends InputCommonProps {
  options: Option[];
  multiple?: boolean;
}

const SelectInput = ({
  name,
  label,
  options,
  errors,
  placeholder,
  register,
  multiple = false
}: SelectInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block font-bold text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className="inputCss form-select"
        multiple={multiple}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default SelectInput;
