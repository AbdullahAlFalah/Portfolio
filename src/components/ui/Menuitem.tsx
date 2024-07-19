import React from 'react'
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type Menuitemdetails = {
    title: string;
    address: string;
    Icon: IconType;
}

export default function Menuitem({title, address, Icon}: Menuitemdetails) {
  return (
    <Link to={address}>
        <div className='hover:text-amber-400'>
            <Icon className='text-4xl sm:hidden'/>
            <p className='uppercase hidden sm:inline text-base'>{title}</p>  
        </div>
    </Link>
  )
}
