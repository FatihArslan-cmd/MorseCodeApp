// src/hooks/useMorseCode.ts
import { useRef, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { Vibration } from 'react-native';
import { convertToMorse, convertToText } from '../utils/morseAlphabet';

const useMorseCode = () => {
  const shortBeep = useRef<Audio.Sound>(new Audio.Sound());
  const longBeep = useRef<Audio.Sound>(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeepChar, setCurrentBeepChar] = useState<string>('');

  useEffect(() => {
    const loadSounds = async () => {
      try {
        await shortBeep.current.loadAsync(require('../../assets/ShortBeep.mp3'));
        await longBeep.current.loadAsync(require('../../assets/LongBeep.mp3'));
      } catch (error) {
        console.error('Error loading sound', error);
      }
    };

    const unloadSounds = async () => {
      try {
        await shortBeep.current.unloadAsync();
        await longBeep.current.unloadAsync();
      } catch (error) {
        console.error('Error unloading sound', error);
      }
    };

    loadSounds();
    return () => {
      unloadSounds();
    };
  }, []);

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

  const playMorseCode = async (inputText: string) => {
    setIsPlaying(true);
    for (let char of inputText) {
      const convertedChar = convertToMorse(char);
      await playBeep(convertedChar);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    setIsPlaying(false);
  };

  const vibrateMorseCode = async (inputText: string) => {
    for (let char of inputText) {
      const convertedChar = convertToMorse(char);
      for (let c of convertedChar) {
        if (c === '.') {
          Vibration.vibrate(180);
        } else if (c === '-') {
          Vibration.vibrate(400);
        }
        await new Promise(resolve => setTimeout(resolve, 400));
      }
    }
  };

  return { playMorseCode, vibrateMorseCode, isPlaying, currentBeepChar };
};

export default useMorseCode;
