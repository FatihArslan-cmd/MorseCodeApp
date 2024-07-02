import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Appbar, Card, Button, Title } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import DocumentScreen from './DocumentScreen';

type RootStackParamList = {
  Home: undefined;
  MorseCodeConverter: undefined;
  MorseCodeApp: undefined;
  Settings: undefined;
  Document:undefined
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          navigation.navigate('Document')
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }
      } catch (error) {
        console.error('Failed to check first launch:', error);
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Appbar.Header style={[ isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Appbar.Content color={isDarkMode ? 'white' : 'black'} title="Learn Morse Code" />
        <TouchableOpacity onPress={() => navigation.navigate('Document')}>
          <Ionicons name="document-text-outline" size={32} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={32} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content style={[ isDarkMode ? styles.cardDarkContainer : styles.lightContainer]}>
            <Title style={isDarkMode ? styles.darkTitle : styles.lightTitle}>{t('Morse Code Converter')}</Title>
          </Card.Content>
          <Card.Actions style={[ isDarkMode ? styles.cardDarkContainer : styles.lightContainer]}>
            <Button mode="contained" onPress={() => navigation.navigate('MorseCodeConverter')}>
              {t('Go to Converter')}
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content style={[ isDarkMode ? styles.cardDarkContainer : styles.lightContainer]}>
            <Title style={isDarkMode ? styles.darkTitle : styles.lightTitle}>{t('Morse Code Simulation')}</Title>
          </Card.Content>
          <Card.Actions style={[ isDarkMode ? styles.cardDarkContainer : styles.lightContainer]}>
            <Button mode="contained" onPress={() => navigation.navigate('MorseCodeApp')}>
              {t('Go to Simulation')}
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkTitle: {
    color: '#ffffff',
    // Additional styles for dark mode Title
  },
  lightTitle: {
    color: '#000000',
    // Additional styles for light mode Title
  },
  lightContainer: {
    backgroundColor: '#f8f8ff',
  },
  cardDarkContainer:{
    backgroundColor: '#333333',
  },
  content: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  button: {
    margin: 8,
  },
});

export default HomeScreen;
