import { Disclosure, Transition } from '@headlessui/react';

import { AiOutlineArrowRight } from 'react-icons/ai';

interface Props {
  title: string;
  element: JSX.Element[] | JSX.Element;
}

const CardDisclosure = ({ title, element }: Props) => {
  return (
    <Disclosure
      as={'div'}
      className="px-10"
    >
      <Disclosure.Button className="mb-5 flex w-full items-center justify-between max-md:flex-col max-md:space-y-5">
        <h2 className="mt-4 flex items-center gap-x-4 max-md:gap-x-2">
          <AiOutlineArrowRight className="duration-300 ui-open:rotate-90" />
          {title}({Array.isArray(element) ? `${element.length}` : "1"})
        </h2>
      </Disclosure.Button>
      <Transition
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="flex flex-col space-y-5">
          {element}
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};

export default CardDisclosure;
