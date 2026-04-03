// src/common/theme/__tests__/appColors.test.ts
import {AppColors} from '../appColors';

describe('AppColors', () => {
  it('should export an object', () => {
    expect(typeof AppColors).toBe('object');
    expect(AppColors).not.toBeNull();
  });

  it('should contain expected color keys', () => {
    const expectedKeys = [
      'vybrazePurple',
      'vybrazeRed',
      'vybrazeBlue',
      'destructive',
      'background',
      'darkBackground',
      'foreground',
      'muted',
      'hoverBlue',
      'white',
      'black',
    ];
    expectedKeys.forEach(key => {
      expect(Object.prototype.hasOwnProperty.call(AppColors, key)).toBe(true);
    });
  });

  it('should have hex color strings for each value', () => {
    const hexRegex = /^#([A-Fa-f0-9]{6})$/;
    Object.keys(AppColors).forEach(key => {
      const val = (AppColors as Record<string, unknown>)[key];
      expect(typeof val).toBe('string');
      expect(hexRegex.test(val as string)).toBe(true);
    });
  });
});
