import React, { useContext } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const [isBeepEnabled, setIsBeepEnabled] = React.useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = React.useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.header,isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.headerText, isDarkMode ? styles.darkText : styles.lightText]}>Settings</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Common</Text>
        <View style={styles.settingItem}>
          <Icon name="brush" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Theme</Text>
          <Text style={[styles.settingSubText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
        <View style={styles.settingItem}>
          <Icon name="language" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Language</Text>
          <Switch value={isBeepEnabled} onValueChange={setIsBeepEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Icon name="vibration" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Vibrate</Text>
          <Switch value={isVibrateEnabled} onValueChange={setIsVibrateEnabled} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Help</Text>
        <View style={styles.settingItem}>
          <Icon name="feedback" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Feedback</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="privacy-tip" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Privacy Policy</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="info" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>version 1.0.2</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.bottomText, isDarkMode ? styles.darkText : styles.lightText]}>Learn Morse Code</Text>
        <Text style={[styles.copyRightText, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
          © 2024 Fatih Arslan
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#333333',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  footer: {
    margin: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  settingText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  bottomText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  copyRightText: {
    textAlign: 'center',
  },
  settingSubText: {
    fontSize: 14,
    color: '#888888',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  darkSubText: {
    color: '#bbbbbb',
  },
  lightSubText: {
    color: '#888888',
  },
});

export default SettingsScreen;
