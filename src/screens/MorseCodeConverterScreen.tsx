import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Appbar, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { convertToMorse, convertToText } from '../utils/morseAlphabet'; // Morse kodları dosyamızı içe aktarın

const MorseCodeConverter = () => {
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [isTextToMorse, setIsTextToMorse] = useState(true);

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
