// components/TestVybraze.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TestVybraze() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vybraze test</Text>
      <Text>Dette er en midlertidig testskjerm.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
});
