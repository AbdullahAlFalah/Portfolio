import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion } from "framer-motion";
import Header from './components/ui/Header/Header';
import Footer from './components/ui/Footer/Footer';
import AboutMe from './pages/AboutMe';
import Portfolio from './pages/Portfolio';
import FlaskAPI from './pages/FlaskAPI';
import HistoricalAnalyzer from './pages/HistoricalAnalyzer';
import ContactMe from './pages/ContactMe';
import Me from './assets/images/Abdullah.jpg';
import CodePic from './assets/images/Code.png';
import Bubbles from './assets/sounds/bubble.mp3';
import './App.css';

const LandingPage: React.FC = () => {

    const skillsData = [
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
        }
    ];

    const projects = [
      {
        title: "Sudoku Game",
        description: "This is a Sudoku game I built using vanilla React Native. It features 3 difficulty levels and a clean simple non-responsive UI.",
        technologyStack: ["React Native", "JavaScript", "TypeScript"],
        githubURL: "https://github.com/AbdullahAlFalah/SudokuGameApp",
        demoURL: "/pages/Portfolio#sudoku-app",
      },
      {
        title: "MishMash App",
        description: "MishMash, as the name suggests, is a mish mash of various features and functionalities. It is an Expo React Native app that showcases my skills in building complex applications.",
        technologyStack: ["React Native", "Expo", "JS/TS", "Node.js", "Express", "AWS", "MySQL", "Postgre", "Aiven"],
        githubURL: "https://github.com/AbdullahAlFalah/first-app",
        demoURL: "/pages/Portfolio#mishmash-app",
      },
      {
        title: "Flask API",
        description: "A RESTful API built with Flask, demonstrating my backend development skills. It includes user authentication, CRUD operations, and data validation.",
        technologyStack: ["Python", "Flask", "REST", "MongoDB"],
        githubURL: "https://github.com/AbdullahAlFalah/my-flask-backend",
        demoURL: "/pages/FlaskAPI_Demo",
      }
    ]

    const projectImages: Record<string, string> = {
      "Sudoku Game": "https://ik.imagekit.io/kh7xo3apt/WebImages/Sudoku.jpg?updatedAt=1758637798824",
      "MishMash App": "https://ik.imagekit.io/kh7xo3apt/WebImages/MishMash.jpg?updatedAt=1758637789305",
      "Flask API": "https://ik.imagekit.io/kh7xo3apt/WebImages/FlaskCode.png?updatedAt=1759490998846",
    };

    // Section visibility tracking
    const skillsSectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    // Audio related refs
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [audioUnlocked, setAudioUnlocked] = useState(false);

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    useEffect(() => {
      // Prepare audio but don’t play yet
      const a = new Audio(Bubbles);
      a.volume = 0.4;
      a.preload = "auto";
      setAudio(a);
    }, []);

    const unlockAudio = () => {
      if (audio) {
        audio.play().then(() => {
          audio.pause(); // Stop immediately
          audio.currentTime = 0; // Reset
          setAudioUnlocked(true); //  now we can play on scroll
        });
      }
    };

    useEffect(() => {
      // Copy the DOM node into a stable variable
      const sectionElement = skillsSectionRef.current;  
      if (!sectionElement) return; // in case ref is still null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              // Play audio only if user has unlocked it
              if (audio && audioUnlocked) {
                audio.currentTime = 0;
                audio.play().catch(() => {});
              }
            } else {
              setInView(false);
            }
          });
        },
        { threshold: 0.5 } // 50% visible = trigger
      );

      observer.observe(sectionElement);

      return () => {
        observer.unobserve(sectionElement);
      };

    }, [audio, audioUnlocked]);

    return (
      <div className='container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'>

        {/* Responsive Circular Image Container */}
        <div className='image-container mt-8 mb-8 sm:mb-12'>
          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img 
              src={Me} 
              alt='Abdullah.jpg'
              loading='lazy' 
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        {/* Welcome Message */}
        <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
            Hi, I'm <span className='text-green-700'>Abdullah Al-Falah!</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
            A Full-Stack Developer
          </p>
          <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed'>
            Welcome to my portfolio! Here, you can check out my latest work and endeavors, where code transforms ideas into reality.<br />
            I'm always open to work, feel free to "Get In Touch" with me.
          </p>

          {/* buttons: group with gap (gap-4 was too big; it is gap-2 now); each button uses relative + hover:z to avoid covering neighbors */}
          <div className="flex flex-wrap justify-center gap-2 isolate"> 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="transform-gpu will-change-transform px-6 py-3 sm:px-8 border border-primary-border text-primary-text rounded-lg font-medium text-sm sm:text-base mx-auto"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("MyExperience")}
              className="transform-gpu will-change-transform px-6 py-3 sm:px-8 bg-primary-background text-primary-text rounded-lg font-medium text-sm sm:text-base mx-auto"
            >
              Check My Experience
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("Skills")}
              className="transform-gpu will-change-transform px-6 py-3 sm:px-8 bg-primary-background text-primary-text rounded-lg font-medium text-sm sm:text-base mx-auto"
            >
              Check My Skills
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/81704848', '_blank')}
              className="transform-gpu will-change-transform px-6 py-3 sm:px-8 border border-primary-border text-primary-text rounded-lg font-medium text-sm sm:text-base mx-auto"
            >
              Get In Touch
            </motion.button>
          </div>
          
        </div>

        {/* Professional Summary */}
        <section className='mb-12 sm:mb-16 flex flex-col items-start gap-3 bg-white rounded-lg shadow p-5 sm:p-8'>
          <h2 className='py-4 font-bold text-2xl sm:text-3xl text-green-700 mb-6'>
            Professional Summary
          </h2>
          <div className='space-y-4 sm:space-y-6'>
            <p className='mb-4 font-semibold text-base sm:text-lg leading-relaxed'>
              I am a driven developer with a BS in Information Technology and hands-on experience as an Unreal Engine Developer, React Native Developer, and Content Writer. 
              Passionate about building innovative solutions and delivering high-quality content, I bring a strong technical foundation and a creative mindset to every project. 
              I thrive on tackling challenges, contributing to impactful projects, and continuously expanding my expertise in the ever-evolving tech industry.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href = {"/pages/AboutMe"}
              className='
                px-6 py-3 sm:px-8 border border-primary-border
                text-primary-foreground rounded-lg font-medium 
                text-sm sm:text-base mx-auto
                inline-flex
                '
            >
              More About Me
            </motion.a>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 mb-12 sm:mb-16 bg-white rounded-lg shadow">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Projects</h2>
              <p className="text-center mb-12 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and passion for development
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto max-w-5xl items-start">
                {/* Project Card */}
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="w-full bg-muted flex justify-center items-center">
                      <img 
                        src={projectImages[project.title]} 
                        alt={`Screenshot of ${project.title} project`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <h4 className='text-base font-semibold w-full'>Tech Stack:</h4>
                        {project.technologyStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-background/10 text-sm rounded-full text-green-700 font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <a
                          href={project.githubURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2 bg-primary-background text-primary-text rounded-lg hover:bg-primary-background/90 transition-colors"
                        >
                          Code
                        </a>
                        <a
                          href={project.demoURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2 border border-primary-border text-primary-text rounded-lg hover:bg-primary-background/10 transition-colors"
                        >
                          Demo
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* My Experience */}
        <section id='MyExperience' className='mb-12 sm:mb-16 flex flex-col items-start gap-3 bg-white rounded-lg shadow p-5 sm:p-8'>
          <h2 className='py-4 font-bold text-2xl sm:text-3xl text-green-700 mb-6'>
            My Experience
          </h2>
          <div className='space-y-4 sm:space-y-6'>
            <p className='mb-4 text-base sm:text-lg leading-relaxed text-gray-700'>
              During my time as an <strong>Unreal Engine Developer</strong> at Markaz Studio (August 2021 - June 2024), 
              I implemented multiple backend plugins including Google's Firebase integration in UE5. I successfully packaged 
              game servers for multiple platforms and deployed them to the cloud using Microsoft's PlayFab services, 
              ensuring scalable and reliable multiplayer experiences.
              I utilized UE5 replication and create an immersive online metaverse with highly engaging multiplayer 
              functionality at its core. This involved complex networking implementations, real-time synchronization, 
              and creating seamless user experiences across different platforms. Additionally, I maintained and updated 
              technical documentation with both speed and accuracy, ensuring clear communication across development teams.
            </p>

            <p className='mb-4 text-base sm:text-lg leading-relaxed text-gray-700'>
              As a <strong>React Native Developer</strong> doing Freelance (June 2024 - Present),
              I design and develop cross-platform mobile applications, implementing responsive UIs and efficient state management.
              I collaborate closely with clients to translate their ideas into functional, high-quality apps, ensuring optimal performance and user experience.
              My work also involves integrating APIs, debugging complex issues, and maintaining clean, scalable code.
            </p>

            <img 
              src={CodePic} 
              alt='Code.png'
              loading='lazy' 
              className='responsive-image w-full h-auto object-contain mx-auto block max-w-lg sm:max-w-xl lg:max-w-2xl'
            />
                    
            <p className='mb-4 text-base sm:text-lg leading-relaxed text-gray-700'>
              Finally, my academic achievements include graduating with honors with a 3.51 GPA from LIU's Faculty of Science, 
              where I earned my BS in Information Technology (2019-2022). I received an "A" grade for my senior project, 
              which was a mobile app developed using Android Studio and Java, recognized for excellent presentation 
              and communication skills. I also hold multiple CISCO certificates (CCNA1-4) obtained during my college years.
            </p>
          </div>
        </section>

        {/* Audio Unlock Button */}
        <div className="mb-10 flex flex-col items-start gap-3 bg-yellow-50 rounded-lg shadow p-5 sm:p-8">
          {/* You can hide this or style it small if you want */}
          <div>
            <h1 className='mb-4 text-base sm:text-lg leading-relaxed text-gray-700'>
              Note: Please enable this feature, then scroll down to the "Technical Skills" section to experience the interactive bubble effect!
            </h1>
          </div>
          <button 
            onClick={unlockAudio}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Enable Sound
          </button>
        </div>

        {/* Skills Section */}
        <section id='Skills' ref={skillsSectionRef} className='mb-12 sm:mb-16'>
          <h2 className='py-4 font-bold text-2xl sm:text-3xl text-green-700 mb-8 text-center'>
            Technical Skills
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start'>

            {skillsData.map((category, index) => (
              <div 
                key={index} 
                className={`skill-card ${inView ? "animate" : ""} bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 border border-gray-100`}
              >
                <h3 className='text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center'>
                  {category.title}
                </h3>
                            
                <div className='flex flex-wrap gap-2 sm:gap-3 justify-center'>
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={`${skillIndex}-${inView}`} // include inView in key to retrigger animation
                      className='bg-green-100 text-green-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-green-200 transform hover:scale-105 transition-colors duration-200 cursor-default'
                      style={{
                        animation: inView
                        ? `brickDrop 0.5s ease-out ${skillIndex * 0.15}s both`
                        : 'none'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </section>

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
          <Route path="/pages/FlaskAPI" element={<FlaskAPI />}/>
          <Route path="/pages/HistoricalAnalyzer" element={<HistoricalAnalyzer />}/>
        </Routes>
      </div>
      <div className='footer-container'>
        <Footer />
      </div>             
    </div>
  );
};


