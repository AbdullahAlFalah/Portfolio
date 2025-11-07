import './AboutMe.css';
import Me from '../../assets/images/Abdullah.jpg';
import { motion } from 'framer-motion';

const SkillsData = [
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "React", "JavaScript/TypeScript", "Tailwind", "Vercel"]
  },
  {
    title: "Mobile Development", 
    skills: ["React Native", "Expo", "JavaScript/TypeScript", "UI/UX", "Debugging", "Firebase"]
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "Python", "Flask", "REST", "MySQL", "PostgreSQL", "MongoDB Atlas", "AWS", "Aiven", "Render", "GitHub"]
  },
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
    skills: ["FastAPI", "Docker", "Kubernetes"]
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
        className="max-w-7xl mx-auto"
      >

        {/* Hero section with my photo and intro */}
        <section id='Hero' className="mb-12 sm:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            {/* Left: My Photo */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">

                <div className="photo-wrap w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={Me}
                    alt='Abdullah'
                    loading='lazy'
                    className='w-full h-full object-cover block'
                  />
                </div>

              </div>
            </motion.div>

            {/* Right: Title and Tagline */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6">
                About Me
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                Full-stack developer focused on practical, maintainable solutions — web, mobile and backend systems.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Bio Section */}
        <motion.section
          id='Bio'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100"
        >
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
        </motion.section>

        {/* Skills Section: Responsive Grid Layout */}
        <motion.section
          id='Skills' 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >

          {/* Skills Section Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-10 text-center">
            Skills
          </h3>
          
          <div className="flex justify-center">
            <div className='
              columns-1 sm:columns-2 lg:columns-3
              bg-green-300
              rounded-xl 
              ring-4 ring-primary-border ring-offset-8 ring-offset-white/80 
              shadow-lg 
              max-w-4xl
              px-2 sm:px-4 lg:px-6
              pt-2 lg:pt-4
              pb-1 lg:pb-2
              items-start
            '>
              {/* Card for each category */}
              {SkillsData.map((category, index) => (  
                <div 
                  key={index} 
                  className={`
                    bg-white rounded-lg shadow-lg
                    break-inside-avoid-column
                    p-4 sm:p-6 mb-4 sm:mb-6
                    border border-gray-100 hover:shadow-xl transition-shadow duration-300
                    block
                  `}
                >
                  <h4 className='text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center'>
                    {category.title}
                  </h4>
                              
                  <div className='flex flex-wrap gap-2 justify-center'>
                    {/* Skill badges with dynamic text sizing */}
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className={`
                          bg-green-100 text-green-800 
                          px-2 py-1 sm:px-3 sm:py-1.5 
                          rounded-full font-medium 
                          hover:bg-green-200 transform hover:scale-105 
                          transition-colors duration-200 cursor-default
                          ${skill.length > 15 ? 'text-xs' : 'text-sm sm:text-base'}
                        `}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </motion.section>

      </motion.div>
    </div>
  )
}
