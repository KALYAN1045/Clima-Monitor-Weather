// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNight, setIsNight] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('isNight');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Otherwise check current time
    const hours = new Date().getHours();
    return hours >= 18 || hours < 6;
  });

  // Update localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('isNight', JSON.stringify(isNight));
    // Optional: Update document body class for global theme
    document.body.classList.toggle('night-mode', isNight);
  }, [isNight]);

  const toggleDayNight = useCallback(() => {
    setIsNight(prev => !prev);
  }, []);

  const value = React.useMemo(() => ({
    isNight,
    toggleDayNight
  }), [isNight, toggleDayNight]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};