// src/common/components/LoadingIndicator.tsx
import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

type Props = {
  message?: string;
};

export const LoadingIndicator: React.FC<Props> = ({message = 'Loading…'}) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});
