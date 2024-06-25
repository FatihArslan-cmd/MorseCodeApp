import React from 'react';
import Navigation from './src/navigation/navigation';
import { LogBox } from 'react-native';
const App = () => {
  LogBox.ignoreAllLogs // Ignore log notification by message
  return (
   <Navigation/>
  );
};

export default App;
