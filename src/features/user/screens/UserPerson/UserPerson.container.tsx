// src/features/user/screens/UserPerson/UserPerson.container.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import {
  ensureTemplateUser,
  updateUser,
  createUser,
  User as RepoUser,
} from '../../repositories/userRepository';
import { UserPersonScreen } from './UserPerson.screen';
import { useDebouncedSave } from '../../hooks/useDebouncedSave';

type LocalUser = RepoUser;

export const UserPersonContainer: React.FC = () => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const u = await ensureTemplateUser();
        if (!mounted) return;
        setUser(u);
        setIsReady(true);
      } catch (e: unknown) {
        if (!mounted) return;
        const msg = (e as Error)?.message ?? 'Failed to initialize user';
        setError(msg);
        setIsReady(true);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const updatePartial = useCallback(
    async (partial: Partial<LocalUser>) => {
      if (!user) {
        try {
          setIsSaving(true);
          const created = await createUser(partial);
          setUser(created);
          setIsSaving(false);
          setLastSaved(new Date().toISOString());
          return created;
        } catch (e: unknown) {
          setIsSaving(false);
          const msg = (e as Error)?.message ?? 'Failed to create user';
          setError(msg);
          Alert.alert('Error', msg);
          throw e;
        }
      }

      try {
        setIsSaving(true);
        const updated = await updateUser(user.id, partial);
        setIsSaving(false);
        if (!updated) {
          const msg = 'User not found during update';
          setError(msg);
          Alert.alert('Error', msg);
          return null;
        }
        setUser(updated);
        setLastSaved(new Date().toISOString());
        return updated;
      } catch (e: unknown) {
        setIsSaving(false);
        const msg = (e as Error)?.message ?? 'Failed to update user';
        setError(msg);
        Alert.alert('Error', msg);
        throw e;
      }
    },
    [user],
  );

  const { debouncedSave, flush, cancel } = useDebouncedSave<LocalUser>(updatePartial, 800);

  const handleFieldChange = useCallback((field: keyof LocalUser, value: unknown) => {
    setUser((prev: LocalUser | null) => {
      if (!prev) return prev;
      const next = { ...prev, [field]: value } as LocalUser;
      return next;
    });

    debouncedSave({ [field]: value } as Partial<LocalUser>);
  }, [debouncedSave]);

  const handleSave = useCallback(async () => {
    await flush();
    if (!user) {
      Alert.alert('No user', 'No user to save');
      return;
    }
    try {
      setIsSaving(true);
      const updated = await updateUser(user.id, user);
      setIsSaving(false);
      if (!updated) {
        const msg = 'Failed to save user';
        setError(msg);
        Alert.alert('Error', msg);
        return;
      }
      setUser(updated);
      setLastSaved(new Date().toISOString());
    } catch (e: unknown) {
      setIsSaving(false);
      const msg = (e as Error)?.message ?? 'Save failed';
      setError(msg);
      Alert.alert('Error', msg);
    }
  }, [flush, user]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  if (!isReady) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  if (error && !user) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>No user available</Text>
      </View>
    );
  }

  return (
    <UserPersonScreen
      user={user}
      onFieldChange={(field: keyof LocalUser, value: unknown) => handleFieldChange(field, value)}
      updatePartial={updatePartial}
      onSave={handleSave}
      isSaving={isSaving}
      lastSaved={lastSaved}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: '#b00020',
    fontSize: 14,
  },
});
