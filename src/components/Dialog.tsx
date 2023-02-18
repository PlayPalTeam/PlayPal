import { Transition, Dialog } from '@headlessui/react';
import { Fragment, SetStateAction } from 'react';

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
                <Dialog.Title className={'text-center text-lg font-medium leading-6'}>{title}</Dialog.Title>
                {description && <Dialog.Description>Say</Dialog.Description>}
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
