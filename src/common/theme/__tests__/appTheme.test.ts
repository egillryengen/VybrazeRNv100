// src/common/theme/__tests__/appTheme.test.ts
import { lightTheme, darkTheme } from '../appTheme';
import { AppColors } from '../appColors';

describe('AppTheme', () => {
  it('should export lightTheme and darkTheme objects', () => {
    expect(typeof lightTheme).toBe('object');
    expect(typeof darkTheme).toBe('object');
  });

  it('themes should contain expected keys', () => {
    const expectedKeys = [
      'background',
      'appBarBackground',
      'primary',
      'secondary',
      'destructive',
      'foreground',
      'hoverBlue',
    ];
    expectedKeys.forEach((key) => {
      expect(Object.prototype.hasOwnProperty.call(lightTheme, key)).toBe(true);
      expect(Object.prototype.hasOwnProperty.call(darkTheme, key)).toBe(true);
    });
  });

  it('theme values should be hex color strings and reference AppColors values', () => {
    const hexRegex = /^#([A-Fa-f0-9]{6})$/;
    const appColorValues = new Set(Object.values(AppColors));

    Object.keys(lightTheme).forEach((key) => {
      const val = (lightTheme as Record<string, unknown>)[key];
      expect(typeof val).toBe('string');
      expect(hexRegex.test(val as string)).toBe(true);
      // Ensure the theme color exists in AppColors
      expect(appColorValues.has(val as string)).toBe(true);
    });

    Object.keys(darkTheme).forEach((key) => {
      const val = (darkTheme as Record<string, unknown>)[key];
      expect(typeof val).toBe('string');
      expect(hexRegex.test(val as string)).toBe(true);
      expect(appColorValues.has(val as string)).toBe(true);
    });
  });

  it('lightTheme and darkTheme should differ for background and appBarBackground', () => {
    expect(lightTheme.background).not.toBe(darkTheme.background);
    expect(lightTheme.appBarBackground).not.toBe(darkTheme.appBarBackground);
  });
});
