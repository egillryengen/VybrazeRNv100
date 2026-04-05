// File: src/features/user/types/user.types.ts
export type ISODateString = string;

export type Coordinates = {lat: number; lng: number} | string | null;

export enum Visibility {
  PUBLIC = 'public',
  CONTACTS = 'contacts',
  HIDDEN = 'hidden',
}

export enum AccountStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum UserType {
  PERSON = 'Person',
  BUSINESS = 'Business',
  ORGANIZATION = 'Organization',
}

export interface PhotoMeta {
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

export interface User {
  id: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  accountStatus: AccountStatus;
  isBanned: boolean;
  deviceBiometricLinkId?: string | null;
  lastLoginAt?: ISODateString | null;
  userBusinessId?: string | null;

  givenName?: string | null;
  familyName?: string | null;
  displayName: string;
  email: string;
  phoneNumber?: string | null;
  phoneVerified: boolean;
  birthDate?: ISODateString | null;
  gender?: string | null;
  bio?: string | null;
  city: string;
  language: string;
  defaultLocale: string;
  coordinates?: Coordinates;
  photoUrl?: string | null;
  photosMeta?: PhotoMeta | null;
  visibility: Visibility;
  moodStatus?: string | null;

  verifiedBadge: boolean;
  trustScore: number;

  type: UserType;
  businessName?: string | null;

  password?: string | null;
}

export interface UserDraft {
  givenName?: string | null;
  familyName?: string | null;
  displayName: string;
  email: string;
  phoneNumber?: string | null;
  birthDate?: ISODateString | null;
  gender?: string | null;
  bio?: string | null;
  city: string;
  language: string;
  defaultLocale?: string;
  coordinates?: Coordinates;
  photoUrl?: string | null;
  visibility: Visibility;
  moodStatus?: string | null;

  type: UserType;
  businessName?: string | null;

  phoneVerified?: boolean;
  verifiedBadge?: boolean;
  trustScore?: number;

  passwordChangeRequest?: {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  } | null;
}

export interface UserPersonScreenProps {
  user: UserDraft;
  loading: boolean;
  error?: string | null;
  onSave: (draft: UserDraft) => Promise<void>;
  onChangePassword?: (payload: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => Promise<void>;
}

export interface UserSectionProps<T> {
  value: T;
  onChange: (value: T) => void;
  readOnly?: boolean;
}

export const createEmptyUserDraft = (): UserDraft => ({
  givenName: null,
  familyName: null,
  displayName: '',
  email: '',
  phoneNumber: null,
  birthDate: null,
  gender: null,
  bio: null,
  city: '',
  language: 'en',
  defaultLocale: 'en_US',
  coordinates: null,
  photoUrl: null,
  visibility: Visibility.PUBLIC,
  moodStatus: null,
  type: UserType.PERSON,
  businessName: null,
  phoneVerified: false,
  verifiedBadge: false,
  trustScore: 0,
  passwordChangeRequest: null,
});
