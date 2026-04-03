// src/common/components/SaveIndicator.tsx
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

type Props = {
  isSaving?: boolean;
  lastSaved?: string | null;
};

export const SaveIndicator: React.FC<Props> = ({
  isSaving = false,
  lastSaved = null,
}) => {
  if (isSaving) {
    return (
      <View style={styles.row}>
        <ActivityIndicator size="small" />
        <Text style={styles.text}>Saving…</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Text style={styles.text}>
        {lastSaved
          ? `Saved ${new Date(lastSaved).toLocaleString()}`
          : 'Not saved'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
});
