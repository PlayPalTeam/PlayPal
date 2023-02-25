import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonType = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ disabled, text, type, onClick }: ButtonType) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className="btn-primary btn w-full">
      {disabled ? <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" /> : <p>{text}</p>}
    </button>
  );
};

export default Button;
