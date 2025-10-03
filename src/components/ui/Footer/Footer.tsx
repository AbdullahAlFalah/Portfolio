import './Footer.css';
import { IoIosArrowUp } from 'react-icons/io';

const mailTo = `mailto:abdullahalfalah0@gmail.com?subject=${encodeURIComponent("Hello from your website")}
&body=${encodeURIComponent("I wanted to reach out...")}`;

export default function Footer() {

  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };    

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-left">© {year} Abdullah Al-Falah</div>
        <div className="footer-right">
          <a href={mailTo} className="footer-link">Email</a>
          <a href="https://github.com/AbdullahAlFalah" className="footer-link" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/abdullah-al-falah-5502a1192" className="footer-link" target="_blank" rel="noreferrer">LinkedIn</a>
          <button onClick={scrollToTop} className='scroll-to-top bg-white text-green-700 p-2 rounded-full transition' aria-label='Scroll to top'>
            <IoIosArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );

}
