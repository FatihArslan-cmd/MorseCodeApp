
import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as StoreReview from 'expo-store-review';

const handleReviewRequest = async () => {
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable) {
      await StoreReview.requestReview();
    } else {
      Alert.alert(
        "İnceleme İsteği",
        "Cihazınızda inceleme isteği desteklenmiyor."
      );
    }
  };

  export default handleReviewRequest;