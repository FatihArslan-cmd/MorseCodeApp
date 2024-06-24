import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Appbar, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { convertToMorse } from '../utils/morseAlphabet'; // Morse kodları dosyamızı içe aktarın

const MorseCodeConverter = () => {
  const [inputText, setInputText] = useState('');
  const [morseCode, setMorseCode] = useState('');

  const handleConvert = () => {
    const convertedText = convertToMorse(inputText);
    setMorseCode(convertedText);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Enter Text</Title>
              <TextInput
                label="Text"
                mode="outlined"
                value={inputText}
                onChangeText={text => setInputText(text)}
                style={styles.input}
              />
              <Button mode="contained" onPress={handleConvert} style={styles.button}>
                Convert to Morse Code
              </Button>
            </Card.Content>
          </Card>
          {morseCode !== '' && (
            <Card style={styles.card}>
              <Card.Content>
                <Title>Morse Code</Title>
                <Paragraph style={styles.morseText}>{morseCode}</Paragraph>
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
  morseText: {
    fontSize: 18,
    letterSpacing: 1.5,
  },
});

export default MorseCodeConverter;
