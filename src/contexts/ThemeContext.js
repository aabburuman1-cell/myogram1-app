import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = {
    colors: {
      primary: '#FF1493',
      background: isDark ? '#1a1a1a' : '#fff',
      surface: isDark ? '#2a2a2a' : '#f9f9f9',
      text: isDark ? '#fff' : '#000',
      secondaryText: isDark ? '#bbb' : '#666',
      border: isDark ? '#333' : '#eee',
    },
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
