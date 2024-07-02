import React, { useContext, useState, useMemo, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, Modal, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface Language {
  label: string;
  code: string;
}

const SettingsScreen: React.FC = () => {
  const [isVibrateEnabled, setIsVibrateEnabled] = useState<boolean>(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const languages: Language[] = useMemo(() => [
    { label: 'English', code: 'en' },
    { label: 'Chinese', code: 'zh' },
    { label: 'Hindi', code: 'hi' },
    { label: 'Spanish', code: 'es' },
    { label: 'French', code: 'fr' },
    { label: 'Arabic', code: 'ar' },
    { label: 'Bengali', code: 'bn' },
    { label: 'Russian', code: 'ru' },
    { label: 'Portuguese', code: 'pt' },
    { label: 'Urdu', code: 'ur' },
    { label: 'Indonesian', code: 'id' },
    { label: 'German', code: 'de' },
    { label: 'Japanese', code: 'ja' },
    { label: 'Marathi', code: 'mr' },
    { label: 'Telugu', code: 'te' },
    { label: 'Turkish', code: 'tr' },
    { label: 'Tamil', code: 'ta' },
    { label: 'Cantonese', code: 'yue' },
    { label: 'Vietnamese', code: 'vi' },
    { label: 'Korean', code: 'ko' },
    { label: 'Italian', code: 'it' },
    { label: 'Polish', code: 'pl' },
    { label: 'Ukrainian', code: 'uk' },
    { label: 'Dutch', code: 'nl' },
    { label: 'Tagalog', code: 'fil' },
    { label: 'Persian', code: 'fa' },
    { label: 'Romanian', code: 'ro' },
    { label: 'Thai', code: 'th' },
    { label: 'Gujarati', code: 'gu' },
    { label: 'Kannada', code: 'kn' },
    { label: 'Malayalam', code: 'ml' },
    { label: 'Oriya', code: 'or' },
    { label: 'Burmese', code: 'my' },
    { label: 'Punjabi', code: 'pa' },
    { label: 'Uzbek', code: 'uz' },
    { label: 'Sinhala', code: 'si' },
    { label: 'Azerbaijani', code: 'az' },
    { label: 'Greek', code: 'el' },
    { label: 'Hungarian', code: 'hu' },
    { label: 'Czech', code: 'cs' },
    { label: 'Swedish', code: 'sv' },
    { label: 'Danish', code: 'da' },
    { label: 'Slovak', code: 'sk' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Norwegian', code: 'no' },
    { label: 'Hebrew', code: 'he' },
    { label: 'Kazakh', code: 'kk' },
    { label: 'Nepali', code: 'ne' },
    { label: 'Serbian', code: 'sr' },
  ], []);

  const selectedLanguageLabel = useMemo(() => {
    return languages.find(lang => lang.code === currentLanguage)?.label || 'English';
  }, [currentLanguage, languages]);

  const openLanguageModal = useCallback(() => {
    setLanguageModalVisible(true);
  }, []);

  const closeLanguageModal = useCallback(() => {
    setLanguageModalVisible(false);
  }, []);

  const handleLanguageSelect = useCallback((language: Language) => {
    changeLanguage(language.code);
    closeLanguageModal();
  }, [changeLanguage, closeLanguageModal]);

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.header, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.headerText, isDarkMode ? styles.darkText : styles.lightText]}>Settings</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>{t('Common')}</Text>
        <View style={styles.settingItem}>
          <Icon name="brush" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Theme')}</Text>
          <Text style={[styles.settingSubText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
            {isDarkMode ? 'Dark ' : 'Light '}
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={openLanguageModal}>
          <Icon name="language" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Language')}</Text>
          <Text style={[styles.settingSubText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>{selectedLanguageLabel} </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>{t('Help')}</Text>
        <View style={styles.settingItem}>
          <Icon name="feedback" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Feedback')}</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="privacy-tip" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Privacy Policy')}</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="info" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>version 1.0.2</Text>
        </View>
      </View>
      <View style={styles.separator} />

      <View style={styles.footer}>
        <Text style={[styles.bottomText, isDarkMode ? styles.darkText : styles.lightText]}>Learn Morse Code</Text>
        <Text style={[styles.copyRightText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
          © 2024 Fatih Arslan
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={closeLanguageModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, isDarkMode ? styles.darkModalContainer : styles.lightModalContainer]}>
            <Text style={[styles.modalTitle, isDarkMode ? styles.darkText : styles.lightText]}>Select Language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleLanguageSelect(item)}>
                  <Text style={[styles.languageItem, isDarkMode ? styles.darkText : styles.lightText]}>{item.label}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ maxHeight: '70%' }} 
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeLanguageModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  settingSubText: {
    fontSize: 14,
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyRightText: {
    fontSize: 12,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
  lightSubText: {
    color: '#666666',
  },
  darkSubText: {
    color: '#999999',
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '80%', // Set maximum height for the modal container
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default React.memo(SettingsScreen);
