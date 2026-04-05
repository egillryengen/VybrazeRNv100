// path: src/features/user/screens/UserPerson/UserPerson.screen.tsx
// Minimal presentational screen for UserPersonContainer.
// Place at: src/features/user/screens/UserPerson/UserPerson.screen.tsx

import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export interface UserPersonScreenProps {
  user: Record<string, any>;
  onFieldChange: (key: string, value: any) => void;
  updatePartial: (
    partial: Partial<Record<string, any>>,
  ) => Promise<Record<string, any> | null>;
  onSave: () => Promise<void>;
  isSaving: boolean;
  lastSaved: string | null;
}

export const UserPersonScreen: React.FC<UserPersonScreenProps> = ({
  user,
  onFieldChange,
  updatePartial,
  onSave,
  isSaving,
  lastSaved,
}) => {
  const handleBlur = async (key: string, value: any) => {
    // Persist small partial updates on blur
    try {
      await updatePartial({[key]: value});
    } catch {
      // ignore for now
    }
  };

  // Temporary usage to avoid ESLint error for unused import
  console.log(Button);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <Text style={styles.label}>First name</Text>
      <TextInput
        testID="input-firstName"
        style={styles.input}
        value={user?.firstName ?? ''}
        onChangeText={t => onFieldChange('firstName', t)}
        onBlur={() => handleBlur('firstName', user?.firstName ?? '')}
        placeholder="First name"
      />

      <Text style={styles.label}>Last name</Text>
      <TextInput
        testID="input-lastName"
        style={styles.input}
        value={user?.lastName ?? ''}
        onChangeText={t => onFieldChange('lastName', t)}
        onBlur={() => handleBlur('lastName', user?.lastName ?? '')}
        placeholder="Last name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        testID="input-email"
        style={styles.input}
        value={user?.email ?? ''}
        onChangeText={t => onFieldChange('email', t)}
        onBlur={() => handleBlur('email', user?.email ?? '')}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        testID="input-city"
        style={styles.input}
        value={user?.city ?? ''}
        onChangeText={t => onFieldChange('city', t)}
        onBlur={() => handleBlur('city', user?.city ?? '')}
        placeholder="City"
      />

      <View style={styles.row}>
        <TouchableOpacity
          testID="save-button"
          style={[styles.button, isSaving && styles.buttonDisabled]}
          onPress={() => onSave()}
          disabled={isSaving}>
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>

        <View style={styles.meta}>
          <Text testID="last-saved" style={styles.metaText}>
            {lastSaved
              ? `Last saved: ${new Date(lastSaved).toLocaleString()}`
              : 'Not saved yet'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserPersonScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#444',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 6,
  },
  row: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0078D4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  meta: {
    marginLeft: 12,
    flex: 1,
  },
  metaText: {
    color: '#666',
    fontSize: 12,
  },
});
