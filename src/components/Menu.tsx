import Link from 'next/link';
import { useRouter } from 'next/router';

interface MenuProps {
  children: any;
  button: JSX.Element;
  dropEnd?: boolean;
}

export interface MenuItemProps {
  icon: JSX.Element;
  text: string;
  href: string;
}

export const MenuItem = ({ href, text, icon }: MenuItemProps) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <li>
      <Link prefetch={false} className={`${isActive ? 'text-primary' : ''} link-hover link-primary rounded-md hover:no-underline`} href={href}>
        {icon}
        {text}
      </Link>
    </li>
  );
};

export const Menu = ({ children, button, dropEnd }: MenuProps) => {
  return (
    <div className={`dropdown ${dropEnd ? 'dropdown-end' : ''}`}>
      <label tabIndex={0} className="btn-ghost btn h-full">
        {button}
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow-2xl">
        {children}
      </ul>
    </div>
  );
};
