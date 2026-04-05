// File: src/features/user/types/index.ts
// Purpose: Barrel file to re-export User feature types.
// Place this file at: src/features/user/types/index.ts

export * from './user.types';

export {
  User,
  UserDraft,
  UserPersonScreenProps,
  UserSectionProps,
  Visibility,
  AccountStatus,
  UserType,
  Coordinates,
  PhotoMeta,
  ISODateString,
  createEmptyUserDraft,
} from './user.types';
