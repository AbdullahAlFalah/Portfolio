import DownloadButton from '../../components/buttons/Download_BTN';
import './Portfolio.css';

export default function Portfolio() {

  const sudokuUrl = 'https://drive.google.com/uc?export=download&id=17tbUE4yt9-6jeRc_yp0OmiGMfoglHMFl';
  const mishmashUrl = 'https://drive.google.com/uc?export=download&id=';

  return (    

      <div className='portfolio-container max-w-4xl mx-auto py-8 px-4'>
        <h2 className='portfolio-title text-3xl sm:text-4xl font-bold mb-8'>Portfolio:</h2>
        
        {/* Notes section */}
        <div className="mb-10 flex flex-col items-start gap-3 bg-yellow-50 rounded-lg shadow p-5 sm:p-8">
            <div className="text-lg sm:text-xl font-semibold">Notes:</div>
            <p className="text-base sm:text-lg mb-2 text-gray-700 text-left w-full">
              Both APKs are fat APKs so that the apps can be compatible with all architectures.<br />
              This resulted in relatively large sizes for both my apps, so apologies in advance!<br />
            </p>
        </div>

        <div className="mb-10 flex flex-col items-start gap-3 bg-white rounded-lg shadow p-5 sm:p-8">
          <div className="text-lg sm:text-xl font-semibold">Sudoku App:</div>
          <p className="text-base sm:text-lg mb-2 text-gray-700 text-left w-full">
            This is a Sudoku game I built using vanilla React Native. It features 3 difficulty levels and a clean simple non-responsive UI.<br />
            This app was built as a learning project to understand the basics of React Native and mobile app development.<br />
            It includes features like a timer, a hint system to help players, a dynamic theme feature and a local notification system.<br />
            This app is not connected to any backend, with a single exception that's a simple API call made to fetch a random "Fact of the Day".<br />
          </p>
          <DownloadButton
            url={sudokuUrl}
            label="Download Suduko's APK"
          />
        </div>

        <div className="mb-10 flex flex-col items-start gap-3 bg-white rounded-lg shadow p-5 sm:p-8">
          <div className="text-lg sm:text-xl font-semibold">MishMash App:</div>
          <p className="text-base sm:text-lg mb-2 text-gray-700 text-left w-full">
            MishMash, as the name suggests, is a mish mash of various features and functionalities. It is an Expo React Native app that showcases my skills in building complex applications.<br />
            This app includes complex navigation, state management, and a variety of responsive UI components.<br />
            It's design is a bit chaotic, just like the whole process of building it, but it's connected to my own self-developed backend and has lots of the most requested features in the industry and all developed to its standards.<br />
            This app has a remote notification system, login and registration system, ads implemenation, remote background image upgrade system, and a lot more.<br />   
          </p>
          <a 
            className="link text-base sm:text-lg mb-2 text-gray-700 text-left w-full"
            href='https://github.com/AbdullahAlFalah/my-node-express/tree/new-main' 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View MishMash's Backend Code Here!
          </a>
          <DownloadButton
            url={mishmashUrl}
            label="Download MishMash's APK"
          />
        </div>

      </div>

  )

}

