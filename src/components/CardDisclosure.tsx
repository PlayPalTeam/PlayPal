import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";

interface Props {
	href: string;
	title: string;
	element: JSX.Element[];
}

const CardDisclosure = ({ title, element, href }: Props) => {
	return (
		<Disclosure defaultOpen={element.length > 0 ? false : true}>
			<Disclosure.Button className="mb-5 flex w-full items-center justify-between max-md:flex-col max-md:space-y-5">
				<h2 className="flex items-center gap-x-4 max-md:gap-x-2">
					<AiOutlineArrowRight className="duration-300 ui-open:rotate-90" />
					{title}
				</h2>
				<Link
					className="float-right flex w-max items-center justify-end gap-x-2 rounded-full bg-green-500 px-4 py-2 text-white duration-300 ease-in-out hover:bg-green-600"
					href={href}
				>
					<p>New {title}</p>
					<AiOutlinePlus />
				</Link>
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
