import DownloadButton from '../../components/buttons/Download_BTN';
import './Portfolio.css';

export default function Portfolio() {

  const sudokuUrl = 'https://drive.google.com/uc?export=download&id=17tbUE4yt9-6jeRc_yp0OmiGMfoglHMFl';
  const mishmashUrl = 'https://drive.google.com/uc?export=download&id=';

  return (
    <div className='portfolio-container'>
      <h2 className='portfolio-title'>Portfolio:</h2>
      <DownloadButton
        url={sudokuUrl}
        label="Download Suduko's APK"
      />
      <DownloadButton
        url={mishmashUrl}
        label="Download MishMash's APK"
      />
    </div>
  )

}

