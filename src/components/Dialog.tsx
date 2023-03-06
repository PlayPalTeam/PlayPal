import { Transition, Dialog } from '@headlessui/react';
import { Fragment, SetStateAction } from 'react';
import { FaTimes } from 'react-icons/fa';

interface DialogBoxProps {
  title: string;
  description?: string;
  children: any;
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

const DialogBox = ({ isOpen, setIsOpen, title, description, children }: DialogBoxProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={'w-full max-w-lg rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl'}>
                <div className="mb-4 flex items-center justify-center">
                  <Dialog.Title className={'flex-1 text-center text-lg font-medium leading-6'}>{title}</Dialog.Title>
                  <button
                    className="flex h-6 w-6 items-center justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaTimes className="h-4 w-4 text-neutral-700" />
                  </button>
                </div>
                {description && <Dialog.Description>{description}</Dialog.Description>}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogBox;
