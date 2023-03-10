import { memo, ReactNode } from 'react';

interface DialogProps {
  dialogId: string;
  children: ReactNode;
  buttonText: string;
  className?: string;
}

const Dialog = ({ children, dialogId, buttonText, className }: DialogProps) => {
  return (
    <div>
      <label htmlFor={dialogId} className={className}>
        {buttonText}
      </label>
      <input type="checkbox" id={dialogId} className="modal-toggle" />
      <div className={`modal modal-bottom sm:modal-middle`}>
        <div className="modal-box relative">
          <label htmlFor={dialogId} className="btn-sm btn-circle btn absolute right-4 top-4">
            ✕
          </label>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(Dialog);
