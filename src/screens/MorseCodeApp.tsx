import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import { StackNavigationProp } from '@react-navigation/stack'; // Assuming you use stack navigation
import { morseAlphabet } from '../utils/morseAlphabet';
import Entypo from 'react-native-vector-icons/Entypo';

type RootStackParamList = {
  Chart: undefined; 
};

type MorseCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chart'>;

const MorseCodeApp: React.FC = () => {
  const [morseCode, setMorseCode] = useState<string>('');
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const navigation = useNavigation<MorseCodeScreenNavigationProp>(); // Use navigation hook with type

  const handlePressIn = () => {
    setIsPressing(true);
    setStartTime(Date.now());
  };

  const handlePressOut = () => {
    const pressDuration = Date.now() - startTime;
    if (pressDuration < 300) {
      setMorseCode(prev => prev + '.');
    } else {
      setMorseCode(prev => prev + '-');
    }
    setIsPressing(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!isPressing && morseCode) {
      timeout = setTimeout(() => {
        const foundKey = Object.keys(morseAlphabet).find(
          key => morseAlphabet[key] === morseCode
        );
        if (foundKey) {
          Alert.alert(`Morse Kod: ${morseCode} => Harf: ${foundKey}`);
        } else {
          Alert.alert(`Morse Kod: ${morseCode} tanınmadı.`);
        }
        setMorseCode('');
      }, 2000); // 2 saniye bekle
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [morseCode, isPressing]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Chart')} style={styles.arrowContainer}>
        <Entypo name="list" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Morse Kod Girişi</Text>
      <TouchableOpacity
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.buttonText}>Basılı Tut</Text>
      </TouchableOpacity>
      <Text style={styles.morseCode}>{morseCode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 200,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  morseCode: {
    marginTop: 20,
    fontSize: 32,
  },
});

export default MorseCodeApp;
