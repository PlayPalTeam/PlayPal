import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Define the props for the Label component
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

// Create the Label component
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { text, htmlFor, className, ...rest } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("font-margarine font-medium", className)}
      {...rest}
      ref={ref}
    >
      {text}
    </label>
  );
});

Label.displayName = "Label";
