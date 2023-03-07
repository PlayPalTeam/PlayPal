import dynamic from 'next/dynamic';
import { memo } from 'react';

interface DeletButtonProps {
  title: string;
  description: string;
  onClick: () => void;
}

const Dialog = dynamic(() => import('@components/Dialog'));

const DeleteButton = ({ description, title, onClick }: DeletButtonProps) => {
  return (
    <Dialog buttonText="Delete" className="btn-error btn" dialogId="deleteTurf">
      <h3 className="text-lg font-bold text-error">{title}</h3>
      <p className="py-4 text-error-content">{description}</p>
      <button className="btn-outline btn-error btn mt-5 w-full" onClick={onClick}>
        Delete
      </button>
    </Dialog>
  );
};

export default memo(DeleteButton);
