import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Manage dark theme light theme

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Load theme preference from AsyncStorage when the app starts
    const loadThemePreference = async () => {
      try {
        const savedThemePreference = await AsyncStorage.getItem('themePreference');
        if (savedThemePreference !== null) {
          setIsDarkMode(savedThemePreference === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    try {
      const newThemePreference = !isDarkMode ? 'dark' : 'light';
      await AsyncStorage.setItem('themePreference', newThemePreference);
      setIsDarkMode(prevMode => !prevMode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
