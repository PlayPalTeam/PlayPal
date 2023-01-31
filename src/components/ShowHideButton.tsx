import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface Props {
  handleShowPassword: () => void;
  showPassword: boolean;
}

const ShowHideButton = ({ handleShowPassword, showPassword }: Props) => {
  return (
    <button
      type="button"
      className="absolute right-2 top-2"
      onClick={handleShowPassword}
    >
      {showPassword ? (
        <AiFillEye className="h-6 w-6" />
      ) : (
        <AiFillEyeInvisible className="h-6 w-6" />
      )}
    </button>
  );
};

export default ShowHideButton;
