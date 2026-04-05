// File: src/features/user/hooks/useUser.ts
// Purpose: Reusable hook to load/save a user using the in-memory repository.
// Place at: src/features/user/hooks/useUser.ts

import {useCallback, useEffect, useState} from 'react';
import {
  createUser,
  getUserById,
  updateUser,
  ensureTemplateUser,
  __resetStoreForTests,
  User as RepoUser,
} from '../repositories/userRepository';

/**
 * Hook return shape
 */
export interface UseUserResult {
  user: RepoUser | null;
  loading: boolean;
  saving: boolean;
  error?: string | null;
  load: (id?: string) => Promise<void>;
  save: (partial: Partial<RepoUser>) => Promise<RepoUser>;
  refresh: () => Promise<void>;
  resetStoreForTests: () => void;
}

/**
 * useUser
 * - If `initialId` is provided, loads that user on mount.
 * - If no id provided, loads a template user (seed) via ensureTemplateUser.
 */
export function useUser(initialId?: string): UseUserResult {
  const [user, setUser] = useState<RepoUser | null>(null);
  const [loading, setLoading] = useState<boolean>(!!initialId === false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | undefined>(initialId);

  const load = useCallback(async (id?: string) => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const u = await getUserById(id);
        if (!u) {
          throw new Error('User not found');
        }
        setUser(u);
        setCurrentId(u.id);
        return;
      }
      const template = await ensureTemplateUser();
      setUser(template);
      setCurrentId(template.id);
    } catch (err: any) {
      setError(String(err?.message ?? err));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!currentId) {
      await load(undefined);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const u = await getUserById(currentId);
      if (!u) {
        throw new Error('User not found');
      }
      setUser(u);
    } catch (err: any) {
      setError(String(err?.message ?? err));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [currentId, load]);

  const save = useCallback(
    async (partial: Partial<RepoUser>) => {
      setSaving(true);
      setError(null);
      try {
        if (!currentId) {
          // create new user
          const created = await createUser(partial);
          setUser(created);
          setCurrentId(created.id);
          return created;
        }
        // update existing
        const updated = await updateUser(currentId, partial);
        if (!updated) {
          throw new Error('Failed to update user');
        }
        setUser(updated);
        return updated;
      } catch (err: any) {
        setError(String(err?.message ?? err));
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [currentId],
  );

  const resetStoreForTests = useCallback(() => {
    __resetStoreForTests();
    setUser(null);
    setCurrentId(undefined);
    setError(null);
    setLoading(false);
    setSaving(false);
  }, []);

  // Load on mount if initialId not undefined
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) {
        return;
      }
      if (initialId) {
        await load(initialId);
      } else {
        await load(undefined);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  return {
    user,
    loading,
    saving,
    error,
    load,
    save,
    refresh,
    resetStoreForTests,
  };
}

export default useUser;
