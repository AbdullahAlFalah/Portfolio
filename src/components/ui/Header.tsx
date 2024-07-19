import React from 'react'
import Menuitem from './Menuitem'
import { IoIosHome, IoIosInformationCircle} from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import { FaFile } from "react-icons/fa";

export default function Header() {
  return (
    <div className='flex justify-between items-center text-white bg-green-700'>
        <div className='flex gap-4 px-4'>
            <Menuitem title='Home' address='/' Icon={IoIosHome}/>
            <Menuitem title='About Me' address='/pages/AboutMe' Icon={IoIosInformationCircle}/>
            <Menuitem title='Contacts' address='/pages/ContactMe' Icon={RiContactsFill}/>
        </div>
        <div className='flex gap-4 px-4'>
            <Menuitem title='Portfolio' address='/pages/Portfolio' Icon={FaFile}/> 

        </div>
    </div>
  )
}

