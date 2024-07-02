
import React from 'react';
import Navigation from './src/navigation/navigation';
import { LogBox } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
const App = () => {
  LogBox.ignoreAllLogs
  return (
    <ThemeProvider>
   <Navigation/>
   </ThemeProvider>
  );
};

export default App;
