// src/features/user/screens/UserPerson/UserPerson.screen.tsx
import React from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import {User as RepoUser} from '../../repositories/userRepository';
import {SaveIndicator} from '../../components/SaveIndicator';

export interface UserPersonScreenProps {
  user: RepoUser;
  onFieldChange: (field: keyof RepoUser, value: unknown) => void;
  updatePartial: (partial: Partial<RepoUser>) => Promise<RepoUser | null>;
  onSave: () => Promise<void>;
  isSaving?: boolean;
  lastSaved?: string | null;
}

export const UserPersonScreen: React.FC<UserPersonScreenProps> = ({
  user,
  onFieldChange: _onFieldChange,
  updatePartial: _updatePartial,
  onSave,
  isSaving = false,
  lastSaved = null,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>User profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>First name</Text>
        <Text style={styles.value}>{user.firstName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Visibility</Text>
        <Text style={styles.value}>{user.visibility}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          title={isSaving ? 'Saving...' : 'Save'}
          onPress={onSave}
          disabled={isSaving}
        />
      </View>

      <View style={styles.saveRow}>
        <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#111',
  },
  actions: {
    marginTop: 20,
  },
  saveRow: {
    marginTop: 12,
  },
});
