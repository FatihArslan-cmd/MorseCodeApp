import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DataTable, Text, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import { morseAlphabet } from '../utils/morseAlphabet'; // Importing the Morse alphabet

const MorseCodeChart = () => {
  const scrollViewRef = useRef(null);

  const handleScrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const morseEntries = Object.entries(morseAlphabet);

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

            {morseEntries.map(([letter, code]) => (
              <DataTable.Row key={letter}>
                <DataTable.Cell><Text style={styles.cellText}>{letter}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.cellText}>{code}</Text></DataTable.Cell>
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
