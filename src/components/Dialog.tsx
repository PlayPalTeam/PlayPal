import { memo, ReactNode } from 'react';

interface DialogProps {
  dialogId: string;
  title?: string;
  children: ReactNode;
  buttonText: string;
  className?: string;
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
  error?: boolean;
}

const Dialog = ({
  children,
  dialogId,
  buttonText,
  title,
  className,
  error,
  handleOpen,
  handleClose,
  isOpen
}: DialogProps) => {
  return (
    <div>
      <label htmlFor={dialogId} onClick={handleOpen} className={className}>
        {buttonText}
      </label>

      <div className={`modal ${isOpen ? 'modal-open' : ''} modal-bottom sm:modal-middle`}>
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h1 className={`flex-1 text-center text-xl ${error ? 'text-error' : ''}`}>{title}</h1>
            <label onClick={handleClose} className="btn-sm btn-circle btn">
              ✕
            </label>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(Dialog);
