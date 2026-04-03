// src/features/user/screens/UserPerson/sections/UserContactInfoSection.tsx
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export interface UserContactInfoSectionProps {
  phone?: string | null;
  email?: string;
  onChangePhone?: (value: string) => void;
  onChangeEmail?: (value: string) => void;
  labelPhone?: string;
  labelEmail?: string;
  testID?: string;
}

export const UserContactInfoSection: React.FC<UserContactInfoSectionProps> = ({
  phone,
  email,
  onChangePhone,
  onChangeEmail,
  labelPhone = 'Phone',
  labelEmail = 'Email',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID ?? 'user-contact-section'}>
      <Text style={styles.label}>{labelPhone}</Text>
      <TextInput
        style={styles.input}
        value={phone ?? ''}
        placeholder="Phone number"
        onChangeText={text => onChangePhone?.(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.labelWithSpacing}>{labelEmail}</Text>
      <TextInput
        style={styles.input}
        value={email ?? ''}
        placeholder="Email address"
        onChangeText={text => onChangeEmail?.(text)}
        keyboardType="email-address"
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
  labelWithSpacing: {
    fontSize: 14,
    color: '#222',
    marginBottom: 6,
    marginTop: 12,
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
