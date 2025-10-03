import { useEffect, useState } from 'react';
import Menuitem from './Menuitem';
import './Header.css';
import MyLogo from '../../../assets/images/BrowserTabIcon512.png';
import { IoMenuOutline } from "react-icons/io5";
import MobileDrawer from './MobileDrawer';

export default function Header() {

  const [open, setOpen] = useState(false);
  // Track whether viewport is mobile (<=640px)
  const [ isMobile, setIsMobile ] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 640 : true
  );

  useEffect(() => {

    const onScroll = () => {
      const el = document.querySelector('.site-header');
      if (!el) return;
      if (window.scrollY > 8) el.classList.add('scrolled');
      else el.classList.remove('scrolled');
    };

    const onResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (!mobile && open) setOpen(false); // close drawer when switching to desktop
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // run once to set correct state on mount
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };

  }, [open]);

  const items = [
    { title: 'Home', address: '/#Home' },
    { title: 'About Me', address: '/pages/AboutMe' },
    { title: 'Portfolio', address: '/pages/Portfolio' },
    { title: 'Flask Demo', address: '/pages/FlaskAPI#Demo' },
    { title: 'Contact Me', address: '/pages/ContactMe' },
    { title: 'Resume', address: 'https://drive.google.com/file/d/1feYTlsiiLl-DQ0N-FWO3rUMBus1bKZC6/view?usp=sharing', external: true },
  ];

  return (
    <header className="site-header">

      {/* Portfolio's logo and title */}
      <div className="site-header-inner">
        <div className="brand">
          <div className="brand-badge" aria-hidden="true">
            <img src={MyLogo} alt="brand" className="brand-img" />
          </div>
          <span className="brand-text">Abdullah Al-Falah</span>
        </div>

        {/* Desktop nav */}
        <nav className="site-nav" aria-label="Main navigation">
          <Menuitem title='Home' address='/#Home' />
          <Menuitem title='About Me' address='/pages/AboutMe' />
          <Menuitem title='Portfolio' address='/pages/Portfolio' />
          <Menuitem title='Flask Demo' address='/pages/FlaskAPI#Demo' />
          <Menuitem title='Contact Me' address='/pages/ContactMe' /> 
          <a href="https://drive.google.com/file/d/1feYTlsiiLl-DQ0N-FWO3rUMBus1bKZC6/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center group relative">
            <p className='uppercase hidden sm:inline text-base'>Resume</p>
          </a>
        </nav>

        {/* Mobile menu button: still in DOM but hidden via inline style when not mobile to avoid CSS overrides */}
        <button
          className="mobile-menu-btn"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          style={{ display: isMobile ? undefined : 'none' }}
        >
          <IoMenuOutline className="mobile-menu-icon" />
        </button>
      </div>

      {/* Mobile drawer: render only on mobile to prevent desktop display issues */}
      {isMobile && <MobileDrawer open={open} onClose={() => setOpen(false)} items={items} />}
    </header>
  );
}
