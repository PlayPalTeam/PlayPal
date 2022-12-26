import React from 'react'
import { BsInstagram ,BsTwitter ,BsTwitch ,BsFacebook,BsYoutube} from "react-icons/bs";


export const Footer = () => {
  return (
    <>
    <div className="bg-green-400">
					<div className="h-[270px] ml-24 mr-24 ">

						<div className="flex justify-between pt-16 pl-32 pr-32">
							<h1 className="text-2xl font-semibold tracking-widest">PLAYPAL</h1>
							<ul className="flex gap-4">
								<li><BsInstagram  size={30}/></li>
								<li><BsFacebook size={30}/></li>
								<li><BsTwitter size={30} /></li>
								<li><BsTwitch size={30}/></li>
								<li><BsYoutube size={30}/></li>
							</ul>
						</div>

						<div className="flex justify-between pt-16 pl-32 pr-32">
							<div className="flex gap-16">
								<h1>Privacy</h1>
								<h1>Policy</h1>
							</div>
							<ul className="flex gap-4">
								<li>Home</li>
								<li>Our Works</li>
								<li>Blog</li>
								<li>About</li>
								<li>Contact</li>
							</ul>
						</div>

					</div>

				</div>
    
    </>
  )
}
