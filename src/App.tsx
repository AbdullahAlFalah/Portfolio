import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Portfolio from './pages/Portfolio';
import flyingscotsman from './assets/flyingscotsman.png';
import './App.css';
// import { motion } from "framer-motion"

const LandingPage: React.FC = () => {
    return (
      <div className='container'>
        <div className='image-container relative max-w-full overflow-hidden'>
          <img src={flyingscotsman} alt='ChuChu!!!' className='responsive-image w-full h-auto object-contain'></img>        
          <p className='centered-text'>Welcome!</p>
        </div>
        <h1 className='py-4 font-bold text-2xl text-green-700'>Professional Summary</h1>
        <p className='mb-4 font-semibold'>
          I am a driven developer with a BS in Information Technology and experience as an
          Unreal Engine Developer and Content Writer. I am passionate about creating innovative
          solutions and delivering high-quality content. With a strong background in technology
          and a creative mindset, I am eager to contribute to exciting projects and continuously
          learn and grow in the tech industry.
        </p>
      </div>
    );
  };

export default function App() {
  return (
    <div id='root'>
      <Header />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/pages/AboutMe" element={<AboutMe />}/>
          <Route path="/pages/ContactMe" element={<ContactMe />}/>
          <Route path="/pages/Portfolio" element={<Portfolio />}/>
        </Routes>
      </div>
      <div className='footer-container'>
        <Footer />
      </div>             
    </div>
  );
};


