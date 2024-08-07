import React from 'react'
import Footeritem from './Footeritem'
import './Footer.css'
import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
const scrollToTop = () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
};    

  return (
    <div className='flex justify-center items-center text-white bg-green-700 gap-4 px-4 py-2'>
        <Footeritem title='Home' address='/'/>
        <Footeritem title='About Me' address='/pages/AboutMe'/>
        <Footeritem title='Contact Me' address='/pages/ContactMe'/>
        <button onClick={scrollToTop} className='scroll-to-top bg-white text-green-700 p-2 rounded-full transition' aria-label='Scroll to top'>
            <FaArrowUp className=''/>
        </button>
    </div>
  )
}
