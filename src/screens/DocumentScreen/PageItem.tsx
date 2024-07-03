import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import CustomText from '../../components/CustomText';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

interface PageItemProps {
  imageUri: string;
  heading?: string;
  text: string;
  showButton?: boolean;
}

const PageItem: React.FC<PageItemProps> = ({ imageUri, heading, text, showButton }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Splash'>>();

  return (
    <View style={styles.page}>
      <Image
        style={styles.image}
        source={{ uri: imageUri }}
      />
      {heading && <Text style={[styles.heading, isDarkMode ? styles.darkText : styles.lightText]}>{heading}</Text>}
      <CustomText style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        {text}
      </CustomText>
      {showButton && (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.closeButton, isDarkMode ? styles.darkButton : styles.lightButton]}>
          <CustomText style={styles.closeButtonText}>Continue App...</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  darkButton: {
    backgroundColor: '#2196F3',
  },
  lightButton: {
    backgroundColor: '#007AFF',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PageItem;
