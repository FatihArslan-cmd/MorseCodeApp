import React, { useContext, useState, useMemo, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, Modal, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryFlag from 'react-native-country-flag';
import { ThemeContext } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface Language {
  label: string;
  code: string;
  flag: string; // Added flag property
}

const SettingsScreen: React.FC = () => {
  const [isVibrateEnabled, setIsVibrateEnabled] = useState<boolean>(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const languages: Language[] = useMemo(() => [
    { label: 'English', code: 'en', flag: 'GB' },
    { label: 'Chinese', code: 'zh', flag: 'CN' },
    { label: 'Hindi', code: 'hi', flag: 'IN' },
    { label: 'Spanish', code: 'es', flag: 'ES' },
    { label: 'French', code: 'fr', flag: 'FR' },
    { label: 'Arabic', code: 'ar', flag: 'SA' },
    { label: 'Bengali', code: 'bn', flag: 'BD' },
    { label: 'Russian', code: 'ru', flag: 'RU' },
    { label: 'Portuguese', code: 'pt', flag: 'PT' },
    { label: 'Urdu', code: 'ur', flag: 'PK' },
    { label: 'Indonesian', code: 'id', flag: 'ID' },
    { label: 'German', code: 'de', flag: 'DE' },
    { label: 'Japanese', code: 'ja', flag: 'JP' },
    { label: 'Marathi', code: 'mr', flag: 'IN' },
    { label: 'Telugu', code: 'te', flag: 'IN' },
    { label: 'Turkish', code: 'tr', flag: 'TR' },
    { label: 'Tamil', code: 'ta', flag: 'IN' },
    { label: 'Cantonese', code: 'yue', flag: 'HK' },
    { label: 'Vietnamese', code: 'vi', flag: 'VN' },
    { label: 'Korean', code: 'ko', flag: 'KR' },
    { label: 'Italian', code: 'it', flag: 'IT' },
    { label: 'Polish', code: 'pl', flag: 'PL' },
    { label: 'Ukrainian', code: 'uk', flag: 'UA' },
    { label: 'Dutch', code: 'nl', flag: 'NL' },
    { label: 'Tagalog', code: 'fil', flag: 'PH' },
    { label: 'Persian', code: 'fa', flag: 'IR' },
    { label: 'Romanian', code: 'ro', flag: 'RO' },
    { label: 'Thai', code: 'th', flag: 'TH' },
    { label: 'Gujarati', code: 'gu', flag: 'IN' },
    { label: 'Kannada', code: 'kn', flag: 'IN' },
    { label: 'Malayalam', code: 'ml', flag: 'IN' },
    { label: 'Oriya', code: 'or', flag: 'IN' },
    { label: 'Burmese', code: 'my', flag: 'MM' },
    { label: 'Punjabi', code: 'pa', flag: 'IN' },
    { label: 'Uzbek', code: 'uz', flag: 'UZ' },
    { label: 'Sinhala', code: 'si', flag: 'LK' },
    { label: 'Azerbaijani', code: 'az', flag: 'AZ' },
    { label: 'Greek', code: 'el', flag: 'GR' },
    { label: 'Hungarian', code: 'hu', flag: 'HU' },
    { label: 'Czech', code: 'cs', flag: 'CZ' },
    { label: 'Swedish', code: 'sv', flag: 'SE' },
    { label: 'Danish', code: 'da', flag: 'DK' },
    { label: 'Slovak', code: 'sk', flag: 'SK' },
    { label: 'Finnish', code: 'fi', flag: 'FI' },
    { label: 'Norwegian', code: 'no', flag: 'NO' },
    { label: 'Hebrew', code: 'he', flag: 'IL' },
    { label: 'Kazakh', code: 'kk', flag: 'KZ' },
    { label: 'Nepali', code: 'ne', flag: 'NP' },
    { label: 'Serbian', code: 'sr', flag: 'RS' },
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
                <TouchableOpacity onPress={() => handleLanguageSelect(item)} style={styles.languageItemContainer}>
                  <CountryFlag isoCode={item.flag} size={20} />
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
  languageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  languageItem: {
    fontSize: 16,
    marginLeft: 10,
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
