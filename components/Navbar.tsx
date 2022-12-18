import React from "react";
import Image from "next/image";
import logo from "../public/logo.svg";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsArrowLeftRight } from "react-icons/bs";
import { BsCollectionFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { BsFolderFill } from "react-icons/bs";
import { BsCone } from "react-icons/bs";
import {BsDot} from "react-icons/bs";
const Navbar = () => {
  const [nav , setNav]= React.useState(true);
  function navclick(){
    setNav(prevState=>(
      !prevState
    ))
  }

  return (
    <>
      {nav ? 
      <nav className='w-72 h-[100vh] p-6 bg-green-500 text-white '>
      <div className=" flex justify-between mb-10">
      {/* <Image 
      src={logo}
      alt="logo"
      width={400}
      /> */}
      <h1>logo</h1>
      <button onClick={navclick}><BsArrowLeftRight /></button>
    </div>
    
    <div className='text-xs mb-7'>MY CERA</div>
    <ul>
      <li className='flex items-center mb-6'> <BsGrid3X3GapFill /><h1 className='ml-3 '>My Dashboard</h1></li>
      <li className='flex items-center mb-6'> <BsCollectionFill /><h1 className='ml-3 '>My Course</h1></li>
      <li className='flex items-center mb-6'> <BsPeopleFill /><h1 className='ml-3 '>My Groups</h1></li>
      <li className='flex items-center mb-6'> <BsMessenger /><h1 className='ml-3 '>My Messages</h1></li>
      <li className='flex items-center mb-6'> <BsCone /><h1 className='ml-3 '>My Connections</h1></li>
      <li className='flex items-center mb-6'> <BsFolderFill /><h1 className='ml-3 '>My Forums</h1></li>
    </ul>
    <div className='text-xs '>Who's Online</div>
     <p className='text-xs mt-4 ml-2'>There are currently no users online</p>
  
  </nav>
      : 
  <div className=" nav w-16 h-[100vh] p-6 pt-7  bg-green-500  text-white">
        <button  onClick={navclick} className="mb-12"><BsArrowLeftRight /></button>   
  <ul>
  <li className='flex items-center mb-8'> <BsDot /></li>
    <li className='flex items-center mb-8'> <BsGrid3X3GapFill /></li>
    <li className='flex items-center mb-8'> <BsCollectionFill /></li>
    <li className='flex items-center mb-8'> <BsPeopleFill /></li>
    <li className='flex items-center mb-8'> <BsMessenger /></li>
    <li className='flex items-center mb-8'> <BsCone /></li>
    <li className='flex items-center mb-8'> <BsFolderFill /></li>
  </ul>

   </div>
}
    </>
  );
};

export default Navbar;
