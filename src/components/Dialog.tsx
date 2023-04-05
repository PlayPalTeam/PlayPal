import { memo, ReactNode } from 'react';

interface DialogProps {
  dialogId: string;
  title?: string;
  children: ReactNode;
  buttonText: string;
  className?: string;
  error?: boolean;
}

const Dialog = ({ children, dialogId, buttonText, title, className, error }: DialogProps) => {
  return (
    <div>
      <label htmlFor={dialogId} className={className}>
        {buttonText}
      </label>
      <input type="checkbox" id={dialogId} className="modal-toggle" />

      <div className={`modal modal-bottom sm:modal-middle`}>
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h1 className={`flex-1 text-center text-xl ${error ? 'text-error' : ''}`}>{title}</h1>
            <label htmlFor={dialogId} className="btn-sm btn-circle btn">
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
