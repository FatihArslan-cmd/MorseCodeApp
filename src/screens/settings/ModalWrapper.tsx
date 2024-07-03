import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

interface ModalWrapperProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  isDarkMode: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ visible, onRequestClose, children, isDarkMode }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, isDarkMode ? styles.darkModalContainer : styles.lightModalContainer]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  darkModalContainer: {
    backgroundColor: '#333333',
  },
  lightModalContainer: {
    backgroundColor: '#ffffff',
  },
});

export default ModalWrapper;