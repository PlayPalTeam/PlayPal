import Dialog from '@/components/Dialog';
import { memo } from 'react';

interface DeletButtonProps {
  title: string;
  description: string;
  buttonText: string;
  error?: boolean;
  onClick: () => void;
  handleClose: () => void;
  handleOpen: () => void;
  isOpen: boolean;
}

const DeleteButton = ({
  description,
  title,
  onClick,
  buttonText,
  error,
  handleClose,
  handleOpen,
  isOpen
}: DeletButtonProps) => {
  return (
    <Dialog
      error={error}
      title={title}
      buttonText={buttonText}
      className="btn-outline btn-error btn"
      dialogId="deleteTurf"
      handleClose={handleClose}
      handleOpen={handleOpen}
      isOpen={isOpen}
    >
      <p className="py-4 text-error-content">{description}</p>
      <button className="btn-outline btn-error btn mt-5 w-full" onClick={onClick}>
        Delete
      </button>
    </Dialog>
  );
};

export default memo(DeleteButton);
