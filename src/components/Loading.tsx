import { AiOutlineLoading } from 'react-icons/ai';

export const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <AiOutlineLoading className="h-20 w-20 animate-spin text-primary" />
    </div>
  );
};

