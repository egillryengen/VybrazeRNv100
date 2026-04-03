// src/features/user/screens/UserPerson/sections/UserLanguageSection.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface LanguageOption {
  key: string;
  label: string;
}

export interface UserLanguageSectionProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  testID?: string;
  options?: LanguageOption[];
}

const DEFAULT_OPTIONS: LanguageOption[] = [
  {key: 'no', label: 'Norsk'},
  {key: 'en', label: 'English'},
  {key: 'sv', label: 'Svenska'},
  {key: 'da', label: 'Dansk'},
];

export const UserLanguageSection: React.FC<UserLanguageSectionProps> = ({
  value,
  onChange,
  label = 'Language',
  testID,
  options = DEFAULT_OPTIONS,
}) => {
  const selected = value ?? options[0]?.key ?? '';

  return (
    <View style={styles.container} testID={testID ?? 'user-language-section'}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map(opt => {
          const isSelected = selected === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onChange?.(opt.key)}
              testID={`language-option-${opt.key}`}
              accessibilityState={{selected: isSelected}}>
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
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
