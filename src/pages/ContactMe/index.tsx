import React from 'react';
import './ContactMe.css';

export default function ContactMe() {
  return (
    <div className='contact-container'>
      <h2 className='contact-title'>Contact Me:</h2>
      <div className='contact-links'>
        <a href="https://www.linkedin.com/in/abdullah-al-falah-5502a1192" target="_blank" rel="noopener noreferrer">
          My LinkedIn Profile
        </a>
        <a href="https://github.com/AbdullahAlFalah" target="_blank" rel="noopener noreferrer">
          My GitHub Profile
        </a>
      </div>
    </div>
  )
}

