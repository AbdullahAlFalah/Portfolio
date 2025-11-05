import React from 'react'

interface DownloadButtonProps {
  url: string
  label: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ url, label }) => {
  const [hover, setHover] = React.useState(false)

  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 28px',
    background: '#4a90e2',
    color: '#fff',
    borderRadius: 6,
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'box-shadow 180ms ease, transform 180ms ease',
    boxShadow: 'none',
  }

  const hoverStyle: React.CSSProperties = hover
    ? { boxShadow: '0 10px 30px rgba(74, 144, 226, 0.18)' }
    : {}

  return (
    <a 
      href={url} 
      download
      style={{ ...baseStyle, ...hoverStyle }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {label}
    </a>
  )
}

export default DownloadButton

