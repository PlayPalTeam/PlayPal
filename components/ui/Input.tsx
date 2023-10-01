import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        className={twMerge(
          "rounded-md font-instrument_sans text-secondary",
          className,
        )}
        type={type}
        {...props}
        ref={ref}
      />
    );
  },
);

Input.displayName = "Input";
