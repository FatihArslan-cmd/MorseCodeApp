import React from 'react';
import { View, StyleSheet,  Image, Dimensions,ScrollView } from 'react-native';
import { PaperProvider, Button,Text, } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { useWindowDimensions } from 'react-native';

const DocumentContent = ({ setExampleValue, exampleValue }) => {
  const { width } = useWindowDimensions();

  return (
    <PaperProvider>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" style={styles.page}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.paragraph}>
              Morse code is a method used in telecommunication to encode text characters as sequences of two different signal durations, called dots and dashes.
            </Text>
          
          </ScrollView>
        </View>
        <View key="2" style={styles.page}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.paragraph}>
              The Morse code alphabet consists of a series of dots and dashes representing each letter and number.
            </Text>
            
          </ScrollView>
        </View>
        <View key="3" style={styles.page}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Page 3: Practice with Morse Code</Text>
            <Text style={styles.paragraph}>
              Practice translating text to Morse code and vice versa. Use the chart below for reference.
            </Text>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Morse_code_conversations.jpg/800px-Morse_code_conversations.jpg' }} 
              style={[styles.image, { width: width * 0.8, height: (width * 0.8) * 0.6 }]} 
              resizeMode="contain" 
            />
          </ScrollView>
        </View>
        <View key="4" style={styles.page}>
          <Button mode="contained" onPress={() => setExampleValue(exampleValue + 1)}>
            Let's Try
          </Button>
        </View>
      </PagerView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 1,
  },
});

export default DocumentContent;
