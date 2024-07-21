import React from 'react'
import Menuitem from './Menuitem'
import { IoIosHome, IoIosInformationCircle} from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import { FaFile } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

export default function Header() {
  return (
    <div className='flex justify-between items-center text-white bg-green-700 p-2'>
        <div className='flex gap-4 px-4'>
            <Menuitem title='Home' address='/' Icon={IoIosHome}/>
            <Menuitem title='About Me' address='/pages/AboutMe' Icon={IoIosInformationCircle}/>
            <Menuitem title='Contact Me' address='/pages/ContactMe' Icon={RiContactsFill}/>
        </div>
        <div className='flex gap-4 px-4'>
            <Menuitem title='Portfolio' address='/pages/Portfolio' Icon={FaFile}/> 
            <a href="https://drive.google.com/file/d/17hGDKqmFwgO7malpvNsVA_eAbtbLtKYG/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center group relative">
              <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Resume</span>
              <MdAttachFile className='text-4xl sm:hidden'/>
              <p className='uppercase hidden sm:inline text-base'>Resume</p>
            </a>
        </div>
    </div>
  )
}

