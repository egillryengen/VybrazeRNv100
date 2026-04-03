// src/features/user/hooks/__mocks__/useDebouncedSave.ts
export const useDebouncedSave = () => {
  const debouncedSave = jest.fn();
  const flush = jest.fn().mockResolvedValue(undefined);
  const cancel = jest.fn();
  return {debouncedSave, flush, cancel};
};

export default useDebouncedSave;
