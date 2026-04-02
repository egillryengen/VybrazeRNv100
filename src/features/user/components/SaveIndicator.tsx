// src/features/user/components/SaveIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface SaveIndicatorProps {
  isSaving?: boolean;
  lastSaved?: string | null; // ISO timestamp
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ isSaving = false, lastSaved = null }) => {
  if (isSaving) {
    return (
      <View style={styles.container} testID="save-indicator-saving">
        <Text style={styles.savingText}>Saving…</Text>
      </View>
    );
  }

  if (lastSaved) {
    const date = new Date(lastSaved);
    const time = date.toLocaleTimeString();
    return (
      <View style={styles.container} testID="save-indicator-saved">
        <Text style={styles.savedText}>Saved at {time}</Text>
      </View>
    );
  }

  return <View style={styles.container} testID="save-indicator-empty" />;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  savingText: {
    color: '#007AFF',
    fontSize: 13,
  },
  savedText: {
    color: '#666',
    fontSize: 13,
  },
});

