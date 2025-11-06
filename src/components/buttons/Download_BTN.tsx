import React from 'react';
import { motion } from 'framer-motion';

interface DownloadButtonProps {
  url: string
  label: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ url, label }) => {

  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 28px',
    background: '#4a90e2',
    color: '#fff',
    borderRadius: 6,
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '1.1rem',
  }

  return (
    <motion.a 
      href={url} 
      download
      style={baseStyle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  )
}

export default DownloadButton

