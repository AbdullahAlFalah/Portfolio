import React from 'react'
import DownloadButton from '../../components/buttons/Download_BTN'
import './Portfolio.css'

export default function Portfolio() {

  const url = 'https://drive.google.com/uc?export=download&id=17tbUE4yt9-6jeRc_yp0OmiGMfoglHMFl'

  return (
    <div className='portfolio-container'>
      <h2 className='portfolio-title'>Portfolio:</h2>
      <DownloadButton
        url={url}
        label="Download Suduko's APK"
      />
    </div>
  )

}

