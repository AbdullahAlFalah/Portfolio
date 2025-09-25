import './AboutMe.css';
import Me from '../../assets/Abdullah.jpg';
import { motion } from 'framer-motion';

const socialSkillsData = [
  {
    title: "Social Skills",
    skills: ["Focused Listening", "Collaboration", "Conflict Resolution", "Adaptability"]
  },
  {
    title: "Language Skills",
    skills: ["English", "Arabic", "French"]
  },
  {
    title: "In-progress Skills",
    skills: ["Python", "FastAPI", "Flask", "Docker"]
  },
  {
    title: "Hobbies",
    skills: ["Gaming", "Reading", "Cooking"]
  }
];

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

          {/* Left side (image and social skills) */}
          <div className="flex flex-col gap-12 justify-center">

            <img 
              src={Me}
              alt='Abdullah.jpg'
              loading='lazy'
              className='
                max-w-xs sm:max-w-sm w-full 
                object-cover 
                rounded-xl 
                ring-4 ring-primary ring-offset-8 ring-offset-white/80 
                shadow-lg 
                transition-transform duration-300 hover:scale-[1.02]
              '
            />

            <div className='
              bg-blue-200
              rounded-xl 
              ring-4 ring-primary ring-offset-8 ring-offset-white/80 
              shadow-lg 
              '
            >
              {/* Card for each category */}
              {socialSkillsData.map((category, index) => (    
                <div 
                  key={index} 
                  className={`max-w-xs sm:max-w-sm justify-self-center w-4/5 my-5 bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-100`}
                >
                  <h3 className='text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center'>
                    {category.title}
                  </h3>
                              
                  <div className='flex flex-wrap gap-2 sm:gap-3 justify-center'>
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className='bg-blue-100 text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-blue-200 transform hover:scale-105 transition-colors duration-200 cursor-default'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right side (text) */}
          <div className="flex items-center">
            <div className="about-me-text">
              <p>
                I'm a passionate full-stack developer with expertise in modern front-end technologies, Unreal Engine 5 and artificial intelligence. 
                With over 3 years of experience, I specialize in creating scalable, user-friendly applications that solve real-world problems.
              </p>
              <p>
                My journey in tech started with curiosity about how things work, and now I'm dedicated to building solutions that make a positive impact. 
                I believe in clean code, continuous learning, and the power of technology to transform ideas into reality.
              </p>
              <p>
                I'm committed to continuous learning and improving my craft, embracing new challenges as opportunities to grow. 
                I approach each project with diligence and attention to detail, striving to deliver high-quality solutions while maintaining a mindset focused on improvement and collaboration.
              </p>
              <p>
                Looking ahead, my ambition is to continue developing high-quality software while taking on challenges that push me to improve and innovate. 
                I aim to create solutions that have a meaningful impact for users and organizations, while continuing to grow as a developer and collaborate effectively within professional teams.
              </p>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  )
}
