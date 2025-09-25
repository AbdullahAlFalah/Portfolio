import './AboutMe.css';
import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >

        <div className="grid md:grid-cols-[auto,1fr] gap-12 items-start">

          {/* Left side (image) */}
          <div className="flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-background rounded-full flex items-center justify-center">
                <img 
                  src="https://placeholder-image-service.onrender.com/image/240x240?prompt=Professional%20developer%20portrait%20with%20clean%20background&id=portrait-001" 
                  alt='AbdullahAl-Falah.jpg'
                  loading='lazy'
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side (text) */}
          <div className="flex items-center">
            <div className="about-me-text">
              <p>
                I'm a passionate full-stack developer with expertise in modern web technologies and artificial intelligence. 
                With over 3 years of experience, I specialize in creating scalable, user-friendly applications that solve real-world problems.
              </p>
              <p>
                My journey in tech started with curiosity about how things work, and now I'm dedicated to building solutions that make a positive impact. 
                I believe in clean code, continuous learning, and the power of technology to transform ideas into reality.
              </p>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  )
}
