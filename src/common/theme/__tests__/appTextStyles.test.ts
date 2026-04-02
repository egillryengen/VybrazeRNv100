// src/common/theme/__tests__/appTextStyles.test.ts
import { AppTextStyles } from '../appTextStyles';

describe('AppTextStyles', () => {
  it('should export an object', () => {
    expect(typeof AppTextStyles).toBe('object');
    expect(AppTextStyles).not.toBeNull();
  });

  it('should contain expected style keys', () => {
    const expectedKeys = ['heading1', 'heading2', 'body', 'label', 'button', 'caption'];
    expectedKeys.forEach((key) => {
      expect(Object.prototype.hasOwnProperty.call(AppTextStyles, key)).toBe(true);
    });
  });

  it('each style should have fontSize number and lineHeight number and fontWeight string', () => {
    Object.keys(AppTextStyles).forEach((key) => {
      const style = (AppTextStyles as Record<string, any>)[key];
      expect(style).toBeDefined();
      expect(typeof style.fontSize).toBe('number');
      expect(typeof style.lineHeight).toBe('number');
      expect(typeof style.fontWeight).toBe('string');
    });
  });

  it('fontSize and lineHeight should be positive numbers', () => {
    Object.keys(AppTextStyles).forEach((key) => {
      const style = (AppTextStyles as Record<string, any>)[key];
      expect(style.fontSize).toBeGreaterThan(0);
      expect(style.lineHeight).toBeGreaterThan(0);
    });
  });
});
