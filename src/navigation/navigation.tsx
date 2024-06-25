import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MorseCodeConverter from '../screens/MorseCodeConverterScreen';
import SplashScreenComponent from '../screens/SplashScreenComponent';
import MorseCodeApp from '../screens/MorseCodeApp';
import HomeScreen from '../screens/HomeScreen';
import MorseCodeChart from '../screens/MorseCodeChart';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreenComponent} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Chart" 
          component={MorseCodeChart} 
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

export default Navigation;