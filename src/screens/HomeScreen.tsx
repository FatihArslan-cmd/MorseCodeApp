import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  MorseCodeConverter: undefined;
  MorseCodeApp: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <View style={styles.container}>
      <Button
        title="Go to Morse Code Converter"
        onPress={() => navigation.navigate('MorseCodeConverter')}
      />
      <Button
        title="Go to Morse Code App"
        onPress={() => navigation.navigate('MorseCodeApp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
    padding: 16,
  },
});

export default HomeScreen;
