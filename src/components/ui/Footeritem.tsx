import { Link } from 'react-router-dom';

type Footeritemdetails = {
    title: string;
    address: string;
}

export default function Footeritem({title, address}:Footeritemdetails) {
  return (
    <Link to={address} className='flex'>
        <div className='hover:text-amber-400'>
            <p className='uppercase text-base'>{title}</p>
        </div>
    </Link>
  )
}
