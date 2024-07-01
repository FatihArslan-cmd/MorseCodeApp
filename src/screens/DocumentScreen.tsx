import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import * as Animatable from 'react-native-animatable';
import CustomText from '../components/CustomText';
import PageIndicator from './PageIndicator';

const DocumentScreen = ({ visible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
                <Text style={styles.heading}>Introduction to Morse Code</Text>
                <CustomText style={styles.text}>
                  Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called dots and dashes.
                </CustomText>
              </Animatable.View>
              <View key="2" style={styles.page}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://cdn.yeniakit.com.tr/images/news/625/samuel-morse-8e543a.jpeg' }}
                />
                <Text style={styles.heading}>History of Morse Code</Text>
                <CustomText style={styles.text}>
                  Invented in the early 1830s by Samuel Morse and Alfred Vail, Morse code was the primary method of electronic communication before the advent of modern telecommunication technologies.
                </CustomText>
              </View>
              <View key="3" style={styles.page}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://images.unsplash.com/photo-1557264303-891df35169e7' }}
                />
                <Text style={styles.heading}>Learning Morse Code</Text>
                <CustomText style={styles.text}>
                  Each letter and number in Morse code is represented by a unique combination of dots and dashes. For instance, 'S' is '...' and 'O' is '---'.
                </CustomText>
              </View>
              <View key="4" style={styles.page}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://images.unsplash.com/photo-1524533541976-217d90eab073' }}
                />
                <CustomText style={styles.text}>
                  This app offers an interactive Morse code learning experience.
                </CustomText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <CustomText style={styles.closeButtonText}>Continue App...</CustomText>
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
  modalView: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
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
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DocumentScreen;
