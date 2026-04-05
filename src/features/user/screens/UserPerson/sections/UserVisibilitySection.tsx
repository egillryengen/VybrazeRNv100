// src/features/user/screens/UserPerson/sections/UserVisibilitySection.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export type VisibilityOption = 'public' | 'contacts' | 'hidden';

export interface UserVisibilitySectionProps {
  value?: VisibilityOption;
  onChange?: (value: VisibilityOption) => void;
  label?: string;
  testID?: string;
}

const OPTIONS: {key: VisibilityOption; label: string}[] = [
  {key: 'public', label: 'Public'},
  {key: 'contacts', label: 'Contacts only'},
  {key: 'hidden', label: 'Hidden'},
];

export const UserVisibilitySection: React.FC<UserVisibilitySectionProps> = ({
  value,
  onChange,
  label = 'Visibility',
  testID,
}) => {
  const selected = value ?? 'public';

  return (
    <View style={styles.container} testID={testID ?? 'user-visibility-section'}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.optionsRow}>
        {OPTIONS.map(opt => {
          const isSelected = selected === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onChange?.(opt.key)}
              testID={`visibility-option-${opt.key}`}
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

export default UserVisibilitySection;
