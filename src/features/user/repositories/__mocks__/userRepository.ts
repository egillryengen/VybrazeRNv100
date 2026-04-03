// src/features/user/repositories/__mocks__/userRepository.ts
const mockUser = {
  id: 'u1',
  firstName: 'Ola',
  lastName: 'Nordmann',
  email: 'ola@example.com',
};

export const ensureTemplateUser = jest.fn().mockResolvedValue(mockUser);
export const updateUser = jest.fn().mockResolvedValue(mockUser);
export const createUser = jest.fn().mockResolvedValue(mockUser);

export default {
  ensureTemplateUser,
  updateUser,
  createUser,
};

// For CommonJS consumers (Jest sometimes resolves to CJS)
module.exports = {
  __esModule: true,
  ensureTemplateUser,
  updateUser,
  createUser,
  default: {
    ensureTemplateUser,
    updateUser,
    createUser,
  },
};
