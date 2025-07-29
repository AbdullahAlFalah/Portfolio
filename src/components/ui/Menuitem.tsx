import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type Menuitemdetails = {
    title: string;
    address: string;
    Icon: IconType;
}

export default function Menuitem({title, address, Icon}: Menuitemdetails) {
  return (
    <Link to={address} className='group flex relative'>
        <div className='hover:text-amber-400'>
          <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">{title}</span>
          <Icon className='text-4xl sm:hidden'/>
          <p className='uppercase hidden sm:inline text-base'>{title}</p>  
        </div>
    </Link>
  )
}

