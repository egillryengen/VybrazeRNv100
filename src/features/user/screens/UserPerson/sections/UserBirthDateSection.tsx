// src/features/user/screens/UserPerson/sections/UserBirthDateSection.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export interface UserBirthDateSectionProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  testID?: string;
}

export const UserBirthDateSection: React.FC<UserBirthDateSectionProps> = ({
  value,
  onChange,
  label = 'Birth date',
  placeholder = 'YYYY-MM-DD',
  testID,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        testID={testID ?? 'user-birthdate-input'}
        style={styles.input}
        value={value ?? ''}
        placeholder={placeholder}
        onChangeText={(text) => onChange?.(text)}
        keyboardType="default"
        autoCapitalize="none"
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
