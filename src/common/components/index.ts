// src/common/components/index.ts
// Barrel file that re-exports components from their actual location.
// This file intentionally re-exports from the features/user/components folder
// because the component files currently live there.

export * from '../../features/user/components/AppButton';
export * from '../../features/user/components/AppFooter';
export * from '../../features/user/components/LoadingIndicator';
export * from '../../features/user/components/SaveIndicator';
