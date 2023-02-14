import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonType = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  isSubmitting?: boolean;
  onClick?: () => void;
};

const Button = ({ isSubmitting, text, type, onClick }: ButtonType) => {
  return (
    <button type={type} disabled={isSubmitting} onClick={onClick} className="btn-primary btn w-full">
      {isSubmitting ? <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" /> : <p>{text}</p>}
    </button>
  );
};

export default Button;
