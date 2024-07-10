import React, { useState, useRef, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Vibration } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { Audio } from 'expo-av';
import { convertToMorse, convertToText } from '../utils/morseAlphabet'; // Import your Morse code conversion functions
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'; // Import Ad components

const MorseCodeConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');
  const [isTextToMorse, setIsTextToMorse] = useState<boolean>(true);
  const [currentBeepChar, setCurrentBeepChar] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const shortBeep = useRef<Audio.Sound>(new Audio.Sound());
  const longBeep = useRef<Audio.Sound>(new Audio.Sound());
  const { t, i18n } = useTranslation(); // useTranslation hook

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;
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
        setCurrentBeepChar('⚫');
        await shortBeep.current.replayAsync();
      } else if (char === '-') {
        setCurrentBeepChar('➖');
        await longBeep.current.replayAsync();
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      setCurrentBeepChar('');
    }
  };

  // Play Morse code with delay between each character
  const playMorseCode = async () => {
    setIsPlaying(true);
    for (let char of inputText) {
      const convertedChar = convertToMorse(char);
      await playBeep(convertedChar);
      // Delay between each character
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    setIsPlaying(false);
  };

  // Vibrate for Morse code
  const vibrateMorseCode = async () => {
    for (let char of inputText) {
      const convertedChar = convertToMorse(char);
      for (let c of convertedChar) {
        if (c === '.') {
          Vibration.vibrate(180); // Short vibration
        } else if (c === '-') {
          Vibration.vibrate(400); // Long vibration
        }
        await new Promise(resolve => setTimeout(resolve, 400)); // Ensure vibration pattern matches beep delay
      }
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
    setInputText('');
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
      <SafeAreaView style={[styles.safeArea, isDarkMode ? styles.darkSafeArea : styles.lightSafeArea]}>
        <Animatable.View animation="fadeInDownBig" duration={1000}>
          <ScrollView contentContainerStyle={styles.container}>
            <Card style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight]}>
              <Card.Content>
                <Title style={isDarkMode ? styles.darkTitle : styles.lightTitle}>
                  {isTextToMorse ? t('Enter Text') : t('Enter Morse Code')}
                </Title>
                <TextInput
                  label={isTextToMorse ? t('Text') : t('Morse Code')}
                  mode="outlined"
                  value={inputText}
                  onChangeText={text => setInputText(text)}
                  style={styles.input}
                  keyboardType={isTextToMorse ? 'default' : 'visible-password'}
                  theme={{ colors: { text: isDarkMode ? '#ffffff' : '#000000', primary: isDarkMode ? '#bb86fc' : '#6200ee' } }}
                />
                <Button mode="contained" onPress={handleConvert} style={styles.button}>
                  {isTextToMorse ? t('Convert to Morse Code') : t('Convert to Text')}
                </Button>
                <Button mode="text" onPress={toggleConversionMode} style={styles.toggleButton}>
                  {isTextToMorse ? t('Switch to Morse to Text') : t('Switch to text to Morse')}
                </Button>
              </Card.Content>
            </Card>

            {convertedText !== '' && (
              <Animatable.View animation="fadeInUpBig" duration={1000}>
                <Card style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight]}>
                  <Button mode="text" onPress={vibrateMorseCode} style={styles.vibrationButton}>
                    <MaterialCommunityIcons name="vibrate" size={24} color={isDarkMode ? '#ffffff' : 'black'} />
                  </Button>
                  <Card.Content>
                    <Title style={isDarkMode ? styles.darkTitle : styles.lightTitle}>
                      {isTextToMorse ? t('Morse Code') : t('Text')}
                    </Title>
                    <Paragraph style={[styles.convertedText, isDarkMode ? styles.darkConvertedText : styles.lightConvertedText]}>
                      {convertedText}
                    </Paragraph>
                    {isTextToMorse && (
                      <>
                        <Button
                          mode="contained"
                          onPress={playMorseCode}
                          style={styles.button}
                          disabled={isPlaying} // Disable button while playing
                        >
                          <FontAwesome5 name="play" size={18} color="white" />
                        </Button>
                      </>
                    )}
                  </Card.Content>
                </Card>
              </Animatable.View>
            )}
          </ScrollView>
          {currentBeepChar !== '' && (
            <Animatable.View animation="fadeInUp" duration={500} style={styles.beepContainer}>
              <Text style={styles.beepText}>{currentBeepChar}</Text>
            </Animatable.View>
          )}
        </Animatable.View>
        <View style={styles.bannerContainer}>
          <BannerAd
            unitId={'ca-app-pub-3990675625304140/3548618642'} // Replace this with your Ad Unit ID
            size={BannerAdSize.MEDIUM_RECTANGLE} // Larger ad size
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  darkSafeArea: {
    backgroundColor: '#121212',
  },
  lightSafeArea: {
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    position: 'relative', // Added for absolute positioning of the vibration button
    paddingVertical: 10,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  cardLight: {
    backgroundColor: '#f8f8ff',
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
  vibrationButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  convertedText: {
    fontSize: 18,
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  darkConvertedText: {
    color: '#ffffff',
  },
  lightConvertedText: {
    color: '#000000',
  },
  beepContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  beepText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'red',
  },
  darkTitle: {
    color: '#ffffff',
  },
  lightTitle: {
    color: '#000000',
  },
  bannerContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default MorseCodeConverter;
