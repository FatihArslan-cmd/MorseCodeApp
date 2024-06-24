import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MorseCodeConverter from './src/screens/MorseCodeConverterScreen';
import SplashScreenComponent from './src/screens/SplashScreenComponent';
import MorseCodeApp from './src/screens/MorseCodeApp';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreenComponent} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MorseCodeConverter" 
          component={MorseCodeConverter} 
          options={{ headerShown: false }} 
        />
       <Stack.Screen
        name="MorseCodeApp"
        component={MorseCodeApp}
        options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
