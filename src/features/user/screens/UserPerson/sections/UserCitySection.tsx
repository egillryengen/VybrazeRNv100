// src/features/user/screens/UserPerson/sections/UserCitySection.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export interface UserCitySectionProps {
  city?: string;
  onChangeCity?: (value: string) => void;
  label?: string;
  placeholder?: string;
  testID?: string;
}

export const UserCitySection: React.FC<UserCitySectionProps> = ({
  city,
  onChangeCity,
  label = 'City',
  placeholder = 'Enter city',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID ?? 'user-city-section'}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={city ?? ''}
        placeholder={placeholder}
        onChangeText={(text) => onChangeCity?.(text)}
        autoCapitalize="words"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: '#222',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
