import React, { useEffect, useState, FC } from 'react';
import { Text, TextStyle } from 'react-native';
import * as Font from 'expo-font';

interface CustomTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  fontFamily?: 'pop' | 'bungee';
}

const CustomText: FC<CustomTextProps> = ({ children, style, fontFamily }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'pop': require('../../assets/fonts/Poppins-Bold.ttf'),
        'bungee': require('../../assets/fonts/BungeeSpice-Regular.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  const selectedFontFamily = fontFamily || 'pop'; 

  return (
    <Text style={[style, fontsLoaded && { fontFamily: selectedFontFamily }]}>
      {children}
    </Text>
  );
};

export default CustomText;
