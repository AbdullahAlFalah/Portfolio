import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/ui/Header';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Portfolio from './pages/Portfolio';

const LandingPage: React.FC = () => {
    return (
      <div>
        <h1>Landing Page</h1>
        <p>Welcome to the landing page!</p>
      </div>
    );
  };

export default function App() {
  return (
    <>
    <Header />
    <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/pages/AboutMe" element={<AboutMe />}/>
        <Route path="/pages/ContactMe" element={<ContactMe />}/>
        <Route path="/pages/Portfolio" element={<Portfolio />}/>
    </Routes>
    </>
  );
};


