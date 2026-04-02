// src/features/user/screens/UserPerson/UserPerson.container.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  // Guard to avoid state updates after unmount
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    const init = async () => {
      try {
        const u = await ensureTemplateUser();
        if (!isMountedRef.current) return;
        setUser(u);
        setIsReady(true);
      } catch (e: unknown) {
        if (!isMountedRef.current) return;
        const msg = (e as Error)?.message ?? 'Failed to initialize user';
        setError(msg);
        setIsReady(true);
      }
    };

    init();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const updatePartial = useCallback(
    async (partial: Partial<LocalUser>): Promise<LocalUser | null> => {
      // Use local snapshot of mounted flag to avoid race conditions
      const mounted = isMountedRef.current;

      if (!user) {
        try {
          if (mounted) setIsSaving(true);
          const created = await createUser(partial);
          if (!isMountedRef.current) return created;
          setUser(created);
          if (isMountedRef.current) {
            setIsSaving(false);
            setLastSaved(new Date().toISOString());
          }
          return created;
        } catch (e: unknown) {
          if (isMountedRef.current) setIsSaving(false);
          const msg = (e as Error)?.message ?? 'Failed to create user';
          if (isMountedRef.current) {
            setError(msg);
            Alert.alert('Error', msg);
          }
          throw e;
        }
      }

      try {
        if (mounted) setIsSaving(true);
        const updated = await updateUser(user.id, partial);
        if (!isMountedRef.current) return updated ?? null;
        if (isMountedRef.current) setIsSaving(false);
        if (!updated) {
          const msg = 'User not found during update';
          if (isMountedRef.current) {
            setError(msg);
            Alert.alert('Error', msg);
          }
          return null;
        }
        if (isMountedRef.current) {
          setUser(updated);
          setLastSaved(new Date().toISOString());
        }
        return updated;
      } catch (e: unknown) {
        if (isMountedRef.current) setIsSaving(false);
        const msg = (e as Error)?.message ?? 'Failed to update user';
        if (isMountedRef.current) {
          setError(msg);
          Alert.alert('Error', msg);
        }
        throw e;
      }
    },
    [user],
  );

  const { debouncedSave, flush, cancel } = useDebouncedSave<LocalUser>(updatePartial, 800);

  const handleFieldChange = useCallback(
    (field: keyof LocalUser, value: unknown) => {
      setUser((prev: LocalUser | null) => {
        if (!prev) return prev;
        const next = { ...prev, [field]: value } as LocalUser;
        return next;
      });

      debouncedSave({ [field]: value } as Partial<LocalUser>);
    },
    [debouncedSave],
  );

  const handleSave = useCallback(async () => {
    await flush();
    if (!user) {
      if (isMountedRef.current) Alert.alert('No user', 'No user to save');
      return;
    }
    try {
      if (isMountedRef.current) setIsSaving(true);
      const updated = await updateUser(user.id, user);
      if (!isMountedRef.current) return;
      if (isMountedRef.current) setIsSaving(false);
      if (!updated) {
        const msg = 'Failed to save user';
        if (isMountedRef.current) {
          setError(msg);
          Alert.alert('Error', msg);
        }
        return;
      }
      if (isMountedRef.current) {
        setUser(updated);
        setLastSaved(new Date().toISOString());
      }
    } catch (e: unknown) {
      if (isMountedRef.current) setIsSaving(false);
      const msg = (e as Error)?.message ?? 'Save failed';
      if (isMountedRef.current) {
        setError(msg);
        Alert.alert('Error', msg);
      }
    }
  }, [flush, user]);

  useEffect(() => {
    return () => {
      // Try to flush pending saves before unmounting, but don't block unmount.
      // If flush throws, ensure we still cancel to avoid memory leaks.
      (async () => {
        try {
          await flush();
        } catch {
          // ignore flush errors on unmount
        } finally {
          cancel();
        }
      })();
    };
  }, [flush, cancel]);

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
