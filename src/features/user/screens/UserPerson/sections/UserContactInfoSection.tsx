// src/features/user/screens/UserPerson/sections/UserContactInfoSection.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export interface UserContactInfoSectionProps {
  email?: string;
  phone?: string;
  onChangeEmail?: (value: string) => void;
  onChangePhone?: (value: string) => void;
  labelEmail?: string;
  labelPhone?: string;
  testID?: string;
}

export const UserContactInfoSection: React.FC<UserContactInfoSectionProps> = ({
  email,
  phone,
  onChangeEmail,
  onChangePhone,
  labelEmail = 'Email',
  labelPhone = 'Phone',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID ?? 'user-contactinfo-section'}>
      <Text style={styles.label}>{labelEmail}</Text>
      <TextInput
        style={styles.input}
        value={email ?? ''}
        placeholder="you@example.com"
        onChangeText={(text) => onChangeEmail?.(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={[styles.label, { marginTop: 12 }]}>{labelPhone}</Text>
      <TextInput
        style={styles.input}
        value={phone ?? ''}
        placeholder="+47 123 45 678"
        onChangeText={(text) => onChangePhone?.(text)}
        keyboardType="phone-pad"
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
