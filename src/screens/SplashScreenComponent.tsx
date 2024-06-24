import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

SplashScreen.preventAutoHideAsync(); 

const SplashScreenComponent = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Splash'>>();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await SplashScreen.hideAsync(); 
      navigation.replace('Home'); 
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [navigation]);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <Text style={styles.text}>Welcome to Morse Code App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SplashScreenComponent;
