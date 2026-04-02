// src/features/user/screens/UserPerson/sections/UserPreferencesSection.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export interface UserPreferences {
  receiveNewsletter?: boolean;
  darkMode?: boolean;
  [key: string]: any;
}

export interface UserPreferencesSectionProps {
  preferences?: UserPreferences;
  onChange?: (partial: Partial<UserPreferences>) => void;
  label?: string;
  testID?: string;
}

export const UserPreferencesSection: React.FC<UserPreferencesSectionProps> = ({
  preferences = {},
  onChange,
  label = 'Preferences',
  testID,
}) => {
  const newsletter = !!preferences.receiveNewsletter;
  const darkMode = !!preferences.darkMode;

  const setNewsletter = (value: boolean) => {
    onChange?.({ ...preferences, receiveNewsletter: value });
  };

  const setDarkMode = (value: boolean) => {
    onChange?.({ ...preferences, darkMode: value });
  };

  return (
    <View style={styles.container} testID={testID ?? 'user-preferences-section'}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Receive newsletter</Text>
        <Switch
          value={newsletter}
          onValueChange={setNewsletter}
          testID="pref-receive-newsletter-switch"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Dark mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} testID="pref-darkmode-switch" />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowLabel: {
    fontSize: 14,
    color: '#333',
  },
});
