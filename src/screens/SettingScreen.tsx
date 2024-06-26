
import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const [isBeepEnabled, setIsBeepEnabled] = React.useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = React.useState(false);
  const [isCopyToClipboardEnabled, setIsCopyToClipboardEnabled] = React.useState(false);
  const [isBatchScanModeEnabled, setIsBatchScanModeEnabled] = React.useState(false);
  const [isKeepDuplicatesEnabled, setIsKeepDuplicatesEnabled] = React.useState(false);

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
          <Text style={styles.settingText}>Beep</Text>
          <Switch value={isBeepEnabled} onValueChange={setIsBeepEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Vibrate</Text>
          <Switch value={isVibrateEnabled} onValueChange={setIsVibrateEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Copy to clipboard</Text>
          <Switch value={isCopyToClipboardEnabled} onValueChange={setIsCopyToClipboardEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Batch scan mode</Text>
          <Text style={styles.settingSubText}>Add option for batch scan to scan screen (Continuous scanning)</Text>
          <Switch value={isBatchScanModeEnabled} onValueChange={setIsBatchScanModeEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Camera facing</Text>
          <Text style={styles.settingSubText}>Back</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Search engine</Text>
          <Text style={styles.settingSubText}>Google</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Keep duplicates</Text>
          <Text style={styles.settingSubText}>Store duplicate barcodes in history</Text>
          <Switch value={isKeepDuplicatesEnabled} onValueChange={setIsKeepDuplicatesEnabled} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  },
  settingSubText: {
    fontSize: 14,
    color: '#888888',
  },
});

export default SettingsScreen;
