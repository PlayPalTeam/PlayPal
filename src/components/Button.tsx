import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonType = {
  isSubmitting: boolean;
  text: string;
  type: 'submit' | 'reset' | 'button';
};

const Button = ({ isSubmitting, text, type }: ButtonType) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className="btn btn-primary w-full"
    >
      {isSubmitting ? (
        <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default Button;
