import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentContent from '../utils/DocumentContent';

const DocumentScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [exampleValue, setExampleValue] = useState(0);

  useEffect(() => {
    if (exampleValue > 0) {
      setModalVisible(false);
    }
  }, [exampleValue]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DocumentContent setExampleValue={setExampleValue} exampleValue={exampleValue} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity  onPress={() => setModalVisible(true)}>
        <Ionicons name="document-text-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent:'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
});

export default DocumentScreen;
