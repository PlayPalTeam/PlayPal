import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, type = "button", ...props }, ref) => {
    return (
      <button
        className={twMerge("rounded-md px-4 py-2 transition", className)}
        type={type}
        {...props}
        ref={ref}
      >
        {text}
      </button>
    );
  },
);

Button.displayName = "Button";
