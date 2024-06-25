import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PaperProvider,Button } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DocumentContent = ({ setExampleValue, exampleValue }) => {
  return (
    <PaperProvider>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" style={styles.page}>
          <Text style={styles.text}>Page 1: Introduction to Morse Code</Text>
        </View>
        <View key="2" style={styles.page}>
          <Text style={styles.text}>Page 2: Morse Code Alphabet</Text>
        </View>
        <View key="3" style={styles.page}>
          <Text style={styles.text}>Page 3: Practice with Morse Code</Text>
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
  },
});

export default DocumentContent;
