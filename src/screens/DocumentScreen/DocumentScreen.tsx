import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import ModalContainer from './ModalContainer';

interface DocumentScreenProps {
  visible: boolean;
  onClose: () => void;
}

const DocumentScreen: React.FC<DocumentScreenProps> = ({ visible, onClose }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;

  return (
    <View style={[styles.centeredView, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <ModalContainer visible={visible} onClose={onClose} />
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
});

export default DocumentScreen;
