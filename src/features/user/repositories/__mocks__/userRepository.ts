// File: src/features/user/repositories/__mocks__/userRepository.ts
// Jest mock for userRepository used in tests.
// Place at: src/features/user/repositories/__mocks__/userRepository.ts

import type {User} from '../userRepository';

let _store: Record<string, User> = {};
let _nextId = 1;

const makeId = () => `mock-user-${_nextId++}`;

export const __resetMockStore = jest.fn(() => {
  _store = {};
  _nextId = 1;
});

export const __getMockStoreSnapshot = jest.fn(() => {
  return JSON.parse(JSON.stringify(_store));
});

export const createUser = jest.fn(
  async (partial: Partial<User>): Promise<User> => {
    const id = makeId();
    const user: User = {
      id,
      visibility: (partial.visibility as any) ?? 'private',
      firstName: (partial as any).firstName ?? null,
      lastName: (partial as any).lastName ?? null,
      email: (partial as any).email ?? '',
      city: (partial as any).city ?? '',
      phone: (partial as any).phone ?? null,
      birthDate: (partial as any).birthDate ?? null,
      gender: (partial as any).gender ?? null,
      language: (partial as any).language ?? 'en',
      photoUrl: (partial as any).photoUrl ?? null,
      preferences: (partial as any).preferences ?? {},
      // Spread partial last so callers can override defaults
      ...partial,
    } as User;

    _store[id] = user;
    return Promise.resolve(user);
  },
);

export const getUserById = jest.fn(async (id: string): Promise<User | null> => {
  return Promise.resolve(_store[id] ?? null);
});

export const updateUser = jest.fn(
  async (id: string, partial: Partial<User>): Promise<User | null> => {
    const existing = _store[id];
    if (!existing) {
      return Promise.resolve(null);
    }
    const updated = {...existing, ...partial};
    _store[id] = updated;
    return Promise.resolve(updated);
  },
);

export const ensureTemplateUser = jest.fn(async (): Promise<User> => {
  const keys = Object.keys(_store);
  if (keys.length > 0) {
    return Promise.resolve(_store[keys[0]]);
  }
  const template = await createUser({
    firstName: 'Template',
    lastName: 'User',
    email: 'template@example.com',
    visibility: 'private',
    preferences: {receiveNewsletter: false, darkMode: false},
  } as Partial<User>);
  return template;
});

// Default export for modules that import default
export default {
  __resetMockStore,
  __getMockStoreSnapshot,
  createUser,
  getUserById,
  updateUser,
  ensureTemplateUser,
};
