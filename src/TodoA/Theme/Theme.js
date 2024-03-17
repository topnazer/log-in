import { useState, useEffect } from 'react';
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";


import './Theme.css';

export default function Theme() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <div className="theme">
      {theme === 'dark' ? (
        <FaToggleOff size={18} onClick={() => setTheme('light')} />
      ) : (
        <FaToggleOn size={18} onClick={() => setTheme('dark')} />
      )}
    </div>
  );
}