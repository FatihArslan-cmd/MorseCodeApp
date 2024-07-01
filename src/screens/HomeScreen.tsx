import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Appbar, Card, Button, Title } from 'react-native-paper';
import DocumentScreen from './DocumentScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Home: undefined;
  MorseCodeConverter: undefined;
  MorseCodeApp: undefined;
  Settings: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          setShowDocumentModal(true);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }
      } catch (error) {
        console.error('Failed to check first launch:', error);
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Learn Morse Code" />
        <TouchableOpacity onPress={() => setShowDocumentModal(true)}>
          <Ionicons name="document-text-outline" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={32} color="black" />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Morse Code Converter</Title>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('MorseCodeConverter')}>
              Go to Converter
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Morse Code Simulation</Title>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('MorseCodeApp')}>
              Go to Simulation
            </Button>
          </Card.Actions>
        </Card>
      </View>
      <DocumentScreen visible={showDocumentModal} onClose={() => setShowDocumentModal(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
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
