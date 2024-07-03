import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeSwitch: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // or provide a fallback UI
  }

  const { isDarkMode, toggleTheme } = themeContext;

  const { t } = useTranslation();

  return (
    <View style={styles.settingItem}>
      <Icon name="brush" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
      <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{t('Theme')}</Text>
      <Text style={[styles.settingSubText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
        {isDarkMode ? 'Dark ' : 'Light '}
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
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
});

export default ThemeSwitch;