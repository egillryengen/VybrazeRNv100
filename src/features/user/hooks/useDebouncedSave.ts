// src/features/user/hooks/__mocks__/useDebouncedSave.ts
export const useDebouncedSave = <
  T extends Record<string, any> = Record<string, any>,
>(
  _saveFn?: (partial: Partial<T>) => Promise<T | null>,
  _delay?: number,
) => {
  const debouncedSave = jest.fn();
  const flush = jest.fn().mockResolvedValue(undefined);
  const cancel = jest.fn();

  return {
    debouncedSave,
    flush,
    cancel,
  };
};
