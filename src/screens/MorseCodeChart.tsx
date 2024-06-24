import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DataTable, Text, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';

const morseCode = [
  { letter: 'A', code: '.-' },
  { letter: 'B', code: '-...' },
  { letter: 'C', code: '-.-.' },
  { letter: 'D', code: '-..' },
  { letter: 'E', code: '.' },
  { letter: 'F', code: '..-.' },
  { letter: 'G', code: '--.' },
  { letter: 'H', code: '....' },
  { letter: 'I', code: '..' },
  { letter: 'J', code: '.---' },
  { letter: 'K', code: '-.-' },
  { letter: 'L', code: '.-..' },
  { letter: 'M', code: '--' },
  { letter: 'N', code: '-.' },
  { letter: 'O', code: '---' },
  { letter: 'P', code: '.--.' },
  { letter: 'Q', code: '--.-' },
  { letter: 'R', code: '.-.' },
  { letter: 'S', code: '...' },
  { letter: 'T', code: '-' },
  { letter: 'U', code: '..-' },
  { letter: 'V', code: '...-' },
  { letter: 'W', code: '.--' },
  { letter: 'X', code: '-..-' },
  { letter: 'Y', code: '-.--' },
  { letter: 'Z', code: '--..' },
  { letter: '1', code: '.----' },
  { letter: '2', code: '..---' },
  { letter: '3', code: '...--' },
  { letter: '4', code: '....-' },
  { letter: '5', code: '.....' },
  { letter: '6', code: '-....' },
  { letter: '7', code: '--...' },
  { letter: '8', code: '---..' },
  { letter: '9', code: '----.' },
  { letter: '0', code: '-----' },
  { letter: '.', code: '.-.-.-' },
  { letter: ',', code: '--..--' },
  { letter: '?', code: '..--..' }
];

const MorseCodeChart = () => {
  const scrollViewRef = useRef(null);

  const handleScrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleScrollToEnd} style={styles.arrowContainer}>
        <Entypo name="arrow-down" size={32} color="red" />
      </TouchableOpacity>

      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <Animatable.View animation="fadeInUpBig" duration={1000} delay={250}>
          <Title style={styles.title}>International Morse Code</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title><Text style={styles.headerText}>Letter</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.headerText}>Morse Code</Text></DataTable.Title>
            </DataTable.Header>

            {morseCode.map((item) => (
              <DataTable.Row key={item.letter}>
                <DataTable.Cell><Text style={styles.cellText}>{item.letter}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.cellText}>{item.code}</Text></DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24, // Example of larger font size
    fontWeight: 'bold', // Example of bold font weight
  },
  headerText: {
    fontSize: 18, // Adjust header text size as needed
    fontWeight: 'bold', // Bold for header text
  },
  cellText: {
    fontSize: 16, // Adjust cell text size as needed
    fontWeight: 'bold', // Bold for cell text
  },
});

export default MorseCodeChart;
