import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { Audio } from 'expo-av';
import { convertToMorse, convertToText } from '../utils/morseAlphabet'; // Import your Morse code conversion functions
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MorseCodeConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');
  const [isTextToMorse, setIsTextToMorse] = useState<boolean>(true);
  const shortBeep = useRef<Audio.Sound>(new Audio.Sound());
  const longBeep = useRef<Audio.Sound>(new Audio.Sound());

  // Load sound files
  const loadSounds = async () => {
    try {
      await shortBeep.current.loadAsync(require('../../assets/ShortBeep.mp3'));
      await longBeep.current.loadAsync(require('../../assets/LongBeep.mp3'));
    } catch (error) {
      console.error('Error loading sound', error);
    }
  };

  // Unload sound files
  const unloadSounds = async () => {
    try {
      await shortBeep.current.unloadAsync();
      await longBeep.current.unloadAsync();
    } catch (error) {
      console.error('Error unloading sound', error);
    }
  };

  // Play beep sounds
  const playBeep = async (convertedChar: string) => {
    for (let char of convertedChar) {
      if (char === '.') {
        await shortBeep.current.replayAsync();
      } else if (char === '-') {
        await longBeep.current.replayAsync();
      }
      // Short delay between signals
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  // Play Morse code with delay between each character
  const playMorseCode = async () => {
    for (let char of inputText) {
      const convertedChar = convertToMorse(char);
      await playBeep(convertedChar);
      // Delay between each character
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const handleConvert = () => {
    if (isTextToMorse) {
      const converted = convertToMorse(inputText);
      setConvertedText(converted);
    } else {
      const converted = convertToText(inputText);
      setConvertedText(converted);
    }
  };

  const toggleConversionMode = () => {
    setIsTextToMorse(!isTextToMorse);
    setConvertedText(''); // Reset the converted text
  };

  // Load sounds when the component mounts and unload when it unmounts
  useEffect(() => {
    loadSounds();
    return () => {
      unloadSounds();
    };
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>{isTextToMorse ? 'Enter Text' : 'Enter Morse Code'}</Title>
              <TextInput
                label={isTextToMorse ? 'Text' : 'Morse Code'}
                mode="outlined"
                value={inputText}
                onChangeText={text => setInputText(text)}
                style={styles.input}
              />
              <Button mode="contained" onPress={handleConvert} style={styles.button}>
                {isTextToMorse ? 'Convert to Morse Code' : 'Convert to Text'}
              </Button>
              <Button mode="text" onPress={toggleConversionMode} style={styles.toggleButton}>
                {isTextToMorse ? 'Switch to Morse to Text' : 'Switch to Text to Morse'}
              </Button>
            </Card.Content>
          </Card>
          {convertedText !== '' && (
            <Card style={styles.card}>
              <Card.Content>
                <Title>{isTextToMorse ? 'Morse Code' : 'Text'}</Title>
                <Paragraph style={styles.convertedText}>{convertedText}</Paragraph>
                {isTextToMorse && (
                  <Button mode="contained" onPress={playMorseCode} style={styles.button}>
        <FontAwesome5
 name="play" size={18} color="white" />
        </Button>
                )}
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  toggleButton: {
    marginTop: 10,
  },
  convertedText: {
    fontSize: 18,
    letterSpacing: 1.5,
  },
});

export default MorseCodeConverter;
