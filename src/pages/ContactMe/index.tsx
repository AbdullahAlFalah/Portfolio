import './ContactMe.css';

export default function ContactMe() {
  return (
    <div className='contact-container max-w-2xl mx-auto py-8 px-4'>
      <h2 className='contact-title text-3xl sm:text-4xl font-bold mb-8'>Contact Me:</h2>

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

    </div>
  )
}

