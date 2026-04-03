/**
 * @format
 */

// Mock user repository to avoid async state updates during app init in tests
jest.mock('../src/features/user/repositories/userRepository', () => {
  return {
    ensureTemplateUser: jest.fn().mockResolvedValue({
      id: 'test-user',
      name: 'Test User',
      email: 'test@example.com',
    }),
    updateUser: jest.fn().mockResolvedValue({
      id: 'test-user',
      name: 'Test User',
      email: 'test@example.com',
    }),
    createUser: jest.fn().mockResolvedValue({
      id: 'test-user',
      name: 'Test User',
      email: 'test@example.com',
    }),
  };
});

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<App />);
    // ensure microtasks complete
    await Promise.resolve();
  });
});
