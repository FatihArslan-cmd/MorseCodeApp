import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { morseAlphabet } from '../utils/morseAlphabet';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';

type RootStackParamList = {
  Chart: undefined;
};

type MorseCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chart'>;

const MorseCodeApp: React.FC = () => {
  const [morseCode, setMorseCode] = useState<string>('');
  const [recognizedLetters, setRecognizedLetters] = useState<string[]>([]);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const navigation = useNavigation<MorseCodeScreenNavigationProp>(); 

  const handlePressIn = () => {
    setIsPressing(true);
    setStartTime(Date.now());
  };

  const handlePressOut = () => {
    const pressDuration = Date.now() - startTime;
    if (pressDuration < 300) {
      setMorseCode(prev => prev + '.');
    } else {
      setMorseCode(prev => prev + '-');
    }
    setIsPressing(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!isPressing && morseCode) {
      timeout = setTimeout(() => {
        const foundKey = Object.keys(morseAlphabet).find(
          key => morseAlphabet[key] === morseCode
        );
        if (foundKey) {
          setRecognizedLetters(prev => [...prev, foundKey]);
        }
        setMorseCode('');
      }, 2000); 
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [morseCode, isPressing]);

  const handleSpace = () => {
    setRecognizedLetters(prev => [...prev, ' ']);
  };

  const handleDelete = () => {
    if (recognizedLetters.length > 0) {
      setDeletingIndex(recognizedLetters.length - 1);
    }
  };

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleAnimationEnd = () => {
    setRecognizedLetters(prev => prev.slice(0, -1));
    setDeletingIndex(null);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Chart')} style={styles.arrowContainer}>
          <Entypo name="list" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
          <Feather name="info" size={32} color="black" />
        </TouchableOpacity>
        <Animatable.View animation="fadeInDownBig" duration={1000}>
          <Text style={styles.title}>Morse Kod Girişi </Text>
        </Animatable.View>
        <Animatable.View animation="bounceIn" duration={1000}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Basılı Tut </Text>
          </TouchableOpacity>
        </Animatable.View>
        <Text style={styles.morseCode}>{morseCode} </Text>
        <Animatable.View animation="zoomIn" duration={1000}>
          <View style={styles.lettersContainer}>
            {recognizedLetters.map((letter, index) => (
              deletingIndex === index ? (
                <Animatable.View
                  animation="fadeOutDownBig"
                  duration={400}
                  key={index}
                  onAnimationEnd={handleAnimationEnd}
                >
                  <Text style={styles.letter}>{letter} </Text>
                </Animatable.View>
              ) : (
                <Animatable.View animation="fadeInDownBig" duration={1000} key={index}>
                  <Text style={styles.letter}>{letter} </Text>
                </Animatable.View>
              )
            ))}
          </View>
        </Animatable.View>
        <Animatable.View animation="bounceIn" duration={1000}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.spaceButton} onPress={handleSpace}>
              <MaterialCommunityIcons name="keyboard-space" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <MaterialCommunityIcons name="backspace" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text>You can practise in this segment</Text>
          <Text> Long press = ➖ (hyphen)</Text>
          <Text> Short press = ⚫ (dot)</Text>
          <Button onPress={hideModal}>Close</Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  arrowContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  infoButton: {
    position: 'absolute',
    top: 40,
    right: 20,
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
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    minHeight: 50,
  },
  letter: {
    fontSize: 32,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  spaceButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default MorseCodeApp;
