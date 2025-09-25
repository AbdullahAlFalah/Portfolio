import './ContactMe.css';
import { motion } from 'framer-motion';

const mailTo = `mailto:abdullahalfalah0@gmail.com?subject=${encodeURIComponent("Hello from your website")}
&body=${encodeURIComponent("I wanted to reach out...")}`;

export default function ContactMe() {
  return (
    <div className='contact-container mb-12 sm:mb-16 bg-white rounded-lg shadow max-w-2xl mx-auto py-8 px-4'>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
      <p className="text-muted-foreground mb-12">
        I'm always interested in new opportunities and exciting projects. 
        Let's connect and build something amazing together!
      </p>

      <div className="mb-10 flex flex-col items-center gap-3 bg-white rounded-lg p-5 sm:p-8 border-4 border-blue-400 hover:border-yellow-500 transition-all duration-300">
        <div className='contact-links'>
          <a href="https://www.linkedin.com/in/abdullah-al-falah-5502a1192" target="_blank" rel="noopener noreferrer">
            My LinkedIn Profile
          </a>
          <a href="https://github.com/AbdullahAlFalah" target="_blank" rel="noopener noreferrer">
            My GitHub Profile
          </a>
        </div>
      </div>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href = {mailTo}
        target='_blank'
        rel='noopener noreferrer' 
        className="px-6 py-3 sm:px-8 bg-primary text-primary-foreground rounded-lg font-medium text-sm sm:text-base mx-auto"
      >
        Send Email
      </motion.a>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('https://wa.me/81704848', '_blank')}
        className="px-6 py-3 sm:px-8 border border-primary text-primary rounded-lg font-medium text-sm sm:text-base mx-auto"
      >
        Send Message
      </motion.button>

    </div>
  )
}
