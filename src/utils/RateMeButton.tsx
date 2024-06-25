import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as StoreReview from 'expo-store-review';

const RateMeButton = () => {
  const handleRateMe = async () => {
    if (await StoreReview.isAvailableAsync()) {
      StoreReview.requestReview();
    } else {
      Alert.alert('Review feature is not available on this device');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Rate Me" onPress={handleRateMe} />
    </View>
  );
};

export default RateMeButton;
