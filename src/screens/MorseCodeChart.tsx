import React, { useState, useRef, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DataTable, Text, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Audio } from 'expo-av';
import { morseAlphabet } from '../utils/morseAlphabet'; // Importing the Morse alphabet
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import { useTranslation } from 'react-i18next';

const MorseCodeChart = () => {
  const [shortBeep, setShortBeep] = useState(new Audio.Sound());
  const [longBeep, setLongBeep] = useState(new Audio.Sound());
  const scrollViewRef = useRef(null);
  const { t } = useTranslation();

  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext to access isDarkMode

  const loadSounds = async () => {
    try {
      await shortBeep.loadAsync(require('../../assets/ShortBeep.mp3'));
      await longBeep.loadAsync(require('../../assets/LongBeep.mp3'));
    } catch (error) {
      console.error('Error loading sound', error);
    }
  };

  const unloadSounds = async () => {
    try {
      await shortBeep.unloadAsync();
      await longBeep.unloadAsync();
    } catch (error) {
      console.error('Error unloading sound', error);
    }
  };

  useEffect(() => {
    loadSounds();
    return () => {
      unloadSounds();
    };
  }, []);

  const playBeep = async (code) => {
    for (let char of code) {
      if (char === '.') {
        await shortBeep.replayAsync();
      } else if (char === '-') {
        await longBeep.replayAsync();
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const handleScrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const morseEntries = Object.entries(morseAlphabet);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity onPress={handleScrollToEnd} style={styles.arrowContainer}>
        <Entypo name="arrow-down" size={32} color={isDarkMode ? 'white' : 'red'} />
      </TouchableOpacity>

      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <Animatable.View animation="fadeInUpBig" duration={1000} delay={250}>
          <Title style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>{t('International Morse Code')}</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title><Text style={[styles.headerText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Letter')}</Text></DataTable.Title>
              <DataTable.Title><Text style={[styles.headerText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Morse Code')}</Text></DataTable.Title>
            </DataTable.Header>

            {morseEntries.map(([letter, code]) => (
              <DataTable.Row key={letter}>
                <DataTable.Cell>
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => playBeep(code)}>
                    <AntDesign name="sound" size={24} color="gray" />
                    <Text style={[styles.cellText, isDarkMode ? styles.darkText : styles.lightText]}>{letter}</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell><Text style={[styles.cellText, isDarkMode ? styles.darkText : styles.lightText]}>{code}</Text></DataTable.Cell>
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#ffffff',
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cellText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
});

export default MorseCodeChart;
