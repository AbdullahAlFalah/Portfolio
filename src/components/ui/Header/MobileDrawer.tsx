import { useEffect } from 'react';
import { Link } from 'react-router-dom';

type Item = { 
  title: string; 
  address: string 
};

export default function MobileDrawer({ open, onClose, items }: { open: boolean; onClose: () => void; items: Item[] }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div className={`mobile-drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} aria-hidden={!open} />
      <aside
        className={`mobile-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="mobile-drawer-inner">
          <button className="drawer-close" onClick={onClose} aria-label="Close menu">✕</button>
          <nav className="mobile-drawer-nav">
            {items.map((it) => (
              <Link key={it.title} to={it.address} className="mobile-drawer-link" onClick={onClose}>
                {it.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
