import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = function () {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);
  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.setAttribute('data-mode', 'dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.removeAttribute('data-mode', 'dark');
    localStorage.theme = 'light';
  }
}

export const useDarkMode = () => useContext(DarkModeContext);
