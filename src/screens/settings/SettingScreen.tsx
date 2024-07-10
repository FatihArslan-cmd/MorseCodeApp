import React, { useState, useRef, useContext, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import ThemeSwitch from './ThemeSwitch';
import LanguageSelector from './LanguageSelector';
import SettingsSection from './SettingsSection';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'; // Import Ad components

const SettingsScreen: React.FC = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // or provide a fallback UI
  }

  const { isDarkMode } = themeContext;

  const { t } = useTranslation();

  const handleTextPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showSnackbar = useCallback(() => {
    setSnackbarVisible(true);
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbarVisible(false);
  }, []);

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.header, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.headerText, isDarkMode ? styles.darkText : styles.lightText]}>Settings</Text>
      </View>
      <View style={styles.separator} />

      <SettingsSection title={t('Common')} isDarkMode={isDarkMode}>
        <ThemeSwitch />
        <LanguageSelector />
      </SettingsSection>

      <View style={styles.separator} />

      <SettingsSection title={t('Help')} isDarkMode={isDarkMode}>
        <View style={styles.settingItem}>
          <Icon name="feedback" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Feedback')}</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="privacy-tip" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Privacy Policy')}</Text>
        </View>
        <TouchableOpacity style={styles.settingItem} onPress={showSnackbar}>
          <Icon name="info" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>version 1.0.2</Text>
        </TouchableOpacity>
      </SettingsSection>

      <View style={styles.separator} />

      <View style={styles.footer}>
        <Text style={[styles.bottomText, isDarkMode ? styles.darkText : styles.lightText]}>Learn Morse Code</Text>
        <Text style={[styles.copyRightText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
          © 2024 Fatih Arslan
        </Text>
      </View>

      

      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Close',
          onPress: hideSnackbar,
        }}
      >
        version 1.0.2
      </Snackbar>
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={'ca-app-pub-3990675625304140/3548618642'} // Replace this with your Ad Unit ID
          size={BannerAdSize.BANNER} // Small banner size
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
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
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginVertical: 20,
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
  darkSubText: {
    color: '#999999',
  },
  lightSubText: {
    color: '#666666',
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
  bannerContainer: {
    alignItems: 'center',
    marginTop:'auto'
  },
});

export default React.memo(SettingsScreen);
