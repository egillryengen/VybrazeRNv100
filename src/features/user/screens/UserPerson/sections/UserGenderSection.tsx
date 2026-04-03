// src/features/user/screens/UserPerson/sections/UserGenderSection.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export type GenderOption = 'male' | 'female' | 'other' | 'unspecified';

export interface UserGenderSectionProps {
  value?: GenderOption;
  onChange?: (value: GenderOption) => void;
  label?: string;
  testID?: string;
}

const OPTIONS: {key: GenderOption; label: string}[] = [
  {key: 'male', label: 'Male'},
  {key: 'female', label: 'Female'},
  {key: 'other', label: 'Other'},
  {key: 'unspecified', label: 'Unspecified'},
];

export const UserGenderSection: React.FC<UserGenderSectionProps> = ({
  value,
  onChange,
  label = 'Gender',
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID ?? 'user-gender-section'}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {OPTIONS.map(opt => {
          const selected = value === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => onChange?.(opt.key)}
              testID={`gender-option-${opt.key}`}
              accessibilityState={{selected}}>
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    color: '#222',
    fontSize: 13,
  },
  optionTextSelected: {
    color: '#fff',
  },
});
