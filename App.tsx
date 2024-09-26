
import React from 'react';
import Navigation from './src/navigation/navigation';
import { LogBox } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
const App = () => {
  LogBox.ignoreAllLogs
  return (
    <ThemeProvider>
      <LanguageProvider>
          <Navigation/>
      </LanguageProvider>
   </ThemeProvider>
  );
};

export default App;
