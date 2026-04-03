// src/features/user/types.ts
export type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  language?: string | null;
  preferences?: {
    darkMode?: boolean;
    receiveNewsletter?: boolean;
  } | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type UserDraft = Partial<User>;

export type UserPersonScreenProps = {
  user?: User | null;
  isSaving?: boolean;
  lastSaved?: string | null;
  onFieldChange?: (field: keyof User, value: any) => void;
  onSave?: () => void;
  updatePartial?: (partial: Partial<User>) => void;
  testID?: string;
};
