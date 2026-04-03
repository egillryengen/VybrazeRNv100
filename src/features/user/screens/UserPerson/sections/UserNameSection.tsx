// src/features/user/screens/UserPerson/sections/UserNameSection.tsx
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export interface UserNameSectionProps {
  firstName?: string;
  lastName?: string;
  onChangeFirstName?: (value: string) => void;
  onChangeLastName?: (value: string) => void;
  labelFirstName?: string;
  labelLastName?: string;
  testID?: string;
}

export const UserNameSection: React.FC<UserNameSectionProps> = ({
  firstName,
  lastName,
  onChangeFirstName,
  onChangeLastName,
  labelFirstName = 'First name',
  labelLastName = 'Last name',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID ?? 'user-name-section'}>
      <Text style={styles.label}>{labelFirstName}</Text>
      <TextInput
        style={styles.input}
        value={firstName ?? ''}
        placeholder="First name"
        onChangeText={text => onChangeFirstName?.(text)}
        autoCapitalize="words"
      />

      <Text style={styles.labelWithSpacing}>{labelLastName}</Text>
      <TextInput
        style={styles.input}
        value={lastName ?? ''}
        placeholder="Last name"
        onChangeText={text => onChangeLastName?.(text)}
        autoCapitalize="words"
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
