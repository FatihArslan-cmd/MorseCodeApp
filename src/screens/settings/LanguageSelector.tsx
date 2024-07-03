import React, { useCallback, useMemo, useState,useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryFlag from 'react-native-country-flag';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';

interface Language {
  label: string;
  code: string;
  flag: string;
}

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // or provide a fallback UI
  }

  const { isDarkMode } = themeContext;

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
    <>
      <TouchableOpacity style={styles.settingItem} onPress={openLanguageModal}>
        <Icon name="language" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Language')}</Text>
        <Text style={[styles.settingSubText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>{selectedLanguageLabel} </Text>
      </TouchableOpacity>

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
              style={{ height: '70%' }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeLanguageModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  darkSubText: {
    color: '#999999',
  },
  lightSubText: {
    color: '#666666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
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

export default LanguageSelector;