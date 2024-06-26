import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const [isBeepEnabled, setIsBeepEnabled] = React.useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common</Text>
        <View style={styles.settingItem}>
          <Icon name="brush" size={24} />
          <Text style={styles.settingText}>Theme</Text>
          <Text style={styles.settingSubText}>Light</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="language" size={24} />
          <Text style={styles.settingText}>Language</Text>
          <Switch value={isBeepEnabled} onValueChange={setIsBeepEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Icon name="vibration" size={24} />
          <Text style={styles.settingText}>Vibrate</Text>
          <Switch value={isVibrateEnabled} onValueChange={setIsVibrateEnabled} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help</Text>
        <View style={styles.settingItem}>
          <Icon name="feedback" size={24} />
          <Text style={styles.settingText}>FeedBack</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="privacy-tip" size={24} />
          <Text style={styles.settingText}>Privacy Policy</Text>
        </View>
        <View style={styles.settingItem}>
          <Icon name="info" size={24} />
          <Text style={styles.settingText}>version 1.0.2</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.bottomText}>Learn Morse Code</Text>
        <Text style={styles.copyRightText}>© 2024 Fatih Arslan</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default SettingsScreen;
