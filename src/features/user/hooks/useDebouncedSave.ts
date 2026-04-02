// src/features/user/hooks/useDebouncedSave.ts
import { useCallback, useEffect, useRef } from 'react';

export interface DebouncedSaveHandle<T> {
  debouncedSave: (partial: Partial<T>) => void;
  flush: () => Promise<void>;
  cancel: () => void;
}

/**
 * useDebouncedSave
 * - saveFn: async function that accepts a partial object and persists it
 * - delay: debounce delay in ms
 *
 * Returns { debouncedSave, flush, cancel }.
 */
export function useDebouncedSave<T = any>(
  saveFn: (partial: Partial<T>) => Promise<any>,
  delay = 800,
): DebouncedSaveHandle<T> {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<Partial<T> | null>(null);
  const saveFnRef = useRef(saveFn);

  // keep latest saveFn
  useEffect(() => {
    saveFnRef.current = saveFn;
  }, [saveFn]);

  const runSave = useCallback(async (toSave: Partial<T> | null) => {
    if (!toSave) return;
    try {
      await saveFnRef.current(toSave);
    } catch {
      // swallow here; container handles errors in saveFn itself
    }
  }, []);

  const debouncedSave = useCallback(
    (partial: Partial<T>) => {
      pendingRef.current = { ...(pendingRef.current as Partial<T>), ...partial };
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        const toSave = pendingRef.current;
        pendingRef.current = null;
        timerRef.current = null;
        void runSave(toSave);
      }, delay);
    },
    [delay, runSave],
  );

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const toSave = pendingRef.current;
    pendingRef.current = null;
    await runSave(toSave);
  }, [runSave]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    pendingRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      pendingRef.current = null;
    };
  }, []);

  return { debouncedSave, flush, cancel };
}
