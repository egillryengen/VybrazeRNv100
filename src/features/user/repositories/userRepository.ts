// src/features/user/repositories/userRepository.ts
// Minimal, in-memory repository for development and TypeScript types.

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  city?: string;
  email?: string;
  phone?: string;
  gender?: string;
  language?: string;
  photoUrl?: string;
  preferences?: Record<string, any>;
  visibility?: 'public' | 'private' | 'friends';
  [key: string]: any;
}

let _store: Record<string, User> = {};

const makeId = () => Math.random().toString(36).slice(2, 9);

export async function createUser(partial: Partial<User>): Promise<User> {
  const id = makeId();
  const user: User = {
    id,
    visibility: 'private',
    ...partial,
  } as User;
  _store[id] = user;
  return Promise.resolve(user);
}

export async function getUserById(id: string): Promise<User | null> {
  return Promise.resolve(_store[id] ?? null);
}

export async function updateUser(
  id: string,
  partial: Partial<User>,
): Promise<User | null> {
  const existing = _store[id];
  if (!existing) {
    return Promise.resolve(null);
  }
  const updated = {...existing, ...partial};
  _store[id] = updated;
  return Promise.resolve(updated);
}

export async function ensureTemplateUser(): Promise<User> {
  const keys = Object.keys(_store);
  if (keys.length > 0) {
    return Promise.resolve(_store[keys[0]]);
  }
  const template: Partial<User> = {
    firstName: 'Template',
    lastName: 'User',
    email: 'template@example.com',
    visibility: 'private',
    preferences: {receiveNewsletter: false, darkMode: false},
  };
  return createUser(template);
}

export function __resetStoreForTests() {
  _store = {};
}
