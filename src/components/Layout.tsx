import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";



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
			<div className="md:flex">
				<Navbar />
				{children}
			</div>
		</>
	);
};

export default Layout;
