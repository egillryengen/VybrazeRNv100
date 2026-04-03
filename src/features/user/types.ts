// src/features/user/types.ts
export type ID = string;

export interface Preferences {
  darkMode?: boolean;
  newsletter?: boolean;
  [key: string]: unknown;
}

export interface User {
  id: ID;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  language?: string | null;
  preferences?: Preferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDraft {
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  gender?: User['gender'];
  language?: string | null;
  preferences?: Preferences;
}
