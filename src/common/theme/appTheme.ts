// src/common/theme/appTheme.ts
import { AppColors } from './appColors';

export type AppThemeShape = {
  background: string;
  appBarBackground: string;
  primary: string;
  secondary: string;
  destructive: string;
  foreground: string;
  hoverBlue: string;
};

export const lightTheme: AppThemeShape = {
  background: AppColors.background,
  appBarBackground: AppColors.white,
  primary: AppColors.vybrazePurple,
  secondary: AppColors.vybrazeRed,
  destructive: AppColors.destructive,
  foreground: AppColors.foreground,
  hoverBlue: AppColors.hoverBlue,
};

export const darkTheme: AppThemeShape = {
  background: AppColors.darkBackground,
  appBarBackground: AppColors.black,
  primary: AppColors.vybrazePurple,
  secondary: AppColors.vybrazeBlue,
  destructive: AppColors.destructive,
  foreground: AppColors.white,
  hoverBlue: AppColors.hoverBlue,
};
