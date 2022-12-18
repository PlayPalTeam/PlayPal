import  Navbar  from "../components/Navbar";
import Link from "next/link";

const Home = () => {
  return <div>
    <Navbar />
    		<div className="flex h-screen items-center justify-center">
			<div className="rounded-md bg-green-600 p-2 text-white">
				<Link href={"/auth/signup"}>Sign Up</Link>
			</div>
		</div>
  </div>
 
export default Home;