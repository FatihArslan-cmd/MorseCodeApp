import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import * as Animatable from 'react-native-animatable';
import CustomText from '../components/CustomText';
import PageIndicator from './PageIndicator';
import { ThemeContext } from '../context/ThemeContext'; // Adjust path as per your project structure
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};
const DocumentScreen = ({ visible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Splash'>>();

  return (
    <View style={[styles.centeredView, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={[styles.centeredView, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
          <View style={[styles.modalView, isDarkMode ? styles.darkModal : styles.lightModal]}>
            <PagerView
              style={styles.pagerView}
              initialPage={0}
              onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
            >
              <Animatable.View
                key="1"
                style={styles.page}
                animation="slideInRight"
                duration={1000}
              >
                <Image
                  style={styles.image}
                  source={{ uri: 'https://picsum.photos/700' }}
                />
                <Text style={[styles.heading, isDarkMode ? styles.darkText : styles.lightText]}>{t('Introduction to Morse Code')}  </Text>
                <CustomText style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
                {t('Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called dots and dashes.')}</CustomText>
              </Animatable.View>
              <View key="2" style={styles.page}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://cdn.yeniakit.com.tr/images/news/625/samuel-morse-8e543a.jpeg' }}
                />
                <Text style={[styles.heading, isDarkMode ? styles.darkText : styles.lightText]}>{t('History of Morse Code')}</Text>
                <CustomText style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
{                  t('Invented in the early 1830s by Samuel Morse and Alfred Vail, Morse code was the primary method of electronic communication before the advent of modern telecommunication technologies.')
}                </CustomText>
              </View>
              <View key="3" style={styles.page}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://images.unsplash.com/photo-1557264303-891df35169e7' }}
                />
                <Text style={[styles.heading, isDarkMode ? styles.darkText : styles.lightText]}>{t('Learning Morse Code')}</Text>
                <CustomText style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
                  {t('Each letter and number in Morse code is represented by a unique combination of dots and dashes. For instance, S is ... and O is ---.')}
                </CustomText>
              </View>
              <View key="4" style={styles.page}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://images.unsplash.com/photo-1524533541976-217d90eab073' }}
                />
                <CustomText style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
                  {t('This app offers an interactive Morse code learning experience.')}
                </CustomText>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.closeButton, isDarkMode ? styles.darkButton : styles.lightButton]}>
                  <CustomText style={styles.closeButtonText}>{t('Continue App...')}</CustomText>
                </TouchableOpacity>
              </View>
            </PagerView>
            <PageIndicator total={4} currentIndex={currentPage} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: '#333333',
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },
  modalView: {
    width: '90%',
    height: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  darkModal: {
    backgroundColor: '#444444',
  },
  lightModal: {
    backgroundColor: '#ffffff',
  },
  pagerView: {
    flex: 1,
    width: '100%',
  },
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

export default DocumentScreen;
