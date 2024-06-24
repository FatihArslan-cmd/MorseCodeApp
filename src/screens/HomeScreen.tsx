import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Appbar, Card, Button, Title } from 'react-native-paper';

type RootStackParamList = {
  Home: undefined;
  MorseCodeConverter: undefined;
  MorseCodeApp: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Learn Morse Code" />
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
