import React from 'react'

interface DownloadButtonProps {
  url: string
  label: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ url, label }) => (
  <a href={url} download style={{
    display: 'inline-block',
    padding: '12px 28px',
    background: '#4a90e2',
    color: '#fff',
    borderRadius: '6px',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'background 0.2s'
  }}>
    {label}
  </a>
)

export default DownloadButton

