import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { SelectInputProps } from "../types/types";

const SelectInput = ({ options, label, register }: SelectInputProps) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select
        className="form-select mt-1 w-full rounded-lg focus:ring-green-600 border-green-500"
        id={label}
        {...register("role")}
      >
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectInput);
