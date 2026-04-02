export interface User {
  id: string;
  name: string;
  photoUrl?: string | null;
  birthDate?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  city?: string | null;
  language?: string | null;
  contact?: {
    email?: string | null;
    phone?: string | null;
  };
  visibility?: 'public' | 'private' | 'friends';
  preferences?: Record<string, unknown>;
  business?: {
    company?: string | null;
    title?: string | null;
  };
}

export type UserDraft = Partial<User>;
