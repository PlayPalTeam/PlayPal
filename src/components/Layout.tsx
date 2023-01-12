import Head from "next/head";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Navbar = dynamic(() => import("./Navbar"));

type LayoutProps = {
	children: ReactNode;
	title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
	const message = `PlayPal | ${title}`;
	return (
		<>
			<Head>
				<title>{message}</title>
			</Head>
			<div className="flex">
				<Navbar />
				{children}
			</div>
		</>
	);
};

export default Layout;
