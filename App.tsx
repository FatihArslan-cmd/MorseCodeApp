import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const morseAlphabet: { [key: string]: string } = {
  'A': '.-',    'B': '-...',   'C': '-.-.',   'D': '-..',
  'E': '.',     'F': '..-.',   'G': '--.',    'H': '....',
  'I': '..',    'J': '.---',   'K': '-.-',    'L': '.-..',
  'M': '--',    'N': '-.',     'O': '---',    'P': '.--.',
  'Q': '--.-',  'R': '.-.',    'S': '...',    'T': '-',
  'U': '..-',   'V': '...-',   'W': '.--',    'X': '-..-',
  'Y': '-.--',  'Z': '--..',   '1': '.----',  '2': '..---',
  '3': '...--', '4': '....-',  '5': '.....',  '6': '-....',
  '7': '--...', '8': '---..',  '9': '----.',  '0': '-----'
};

const App: React.FC = () => {
  const [morseCode, setMorseCode] = useState<string>('');
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);

  const handlePressIn = () => {
    setIsPressing(true);
    setStartTime(new Date().getTime());
  };

  const handlePressOut = () => {
    const pressDuration = new Date().getTime() - startTime;
    if (pressDuration < 300) {
      setMorseCode(prev => prev + '.');
    } else {
      setMorseCode(prev => prev + '-');
    }
    setIsPressing(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isPressing && morseCode) {
        const foundKey = Object.keys(morseAlphabet).find(
          key => morseAlphabet[key] === morseCode
        );
        if (foundKey) {
          Alert.alert(`Morse Kod: ${morseCode} => Harf: ${foundKey}`);
        } else {
          Alert.alert(`Morse Kod: ${morseCode} tanınmadı.`);
        }
        setMorseCode('');
      }
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [morseCode, isPressing]);

  return (
    <View style={styles.container}>
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

export default App;
