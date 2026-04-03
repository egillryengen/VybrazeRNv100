// src/features/user/screens/UserPerson/sections/UserBusinessSection.tsx
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export interface UserBusinessSectionProps {
  company?: string;
  title?: string;
  onChangeCompany?: (value: string) => void;
  onChangeTitle?: (value: string) => void;
  labelCompany?: string;
  labelTitle?: string;
  testID?: string;
}

export const UserBusinessSection: React.FC<UserBusinessSectionProps> = ({
  company,
  title,
  onChangeCompany,
  onChangeTitle,
  labelCompany = 'Company',
  labelTitle = 'Title',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID ?? 'user-business-section'}>
      <Text style={styles.label}>{labelCompany}</Text>
      <TextInput
        style={styles.input}
        value={company ?? ''}
        placeholder="Company name"
        onChangeText={text => onChangeCompany?.(text)}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <Text style={styles.labelWithSpacing}>{labelTitle}</Text>
      <TextInput
        style={styles.input}
        value={title ?? ''}
        placeholder="Job title"
        onChangeText={text => onChangeTitle?.(text)}
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
