// src/features/user/screens/UserPerson/__tests__/UserPerson.container.autosave.test.tsx
/// <reference types="jest" />
/// <reference types="node" />
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { UserPersonContainer } from '../UserPerson.container';

// Use mock-prefixed variables so jest.mock factory may reference them safely
const mockDebouncedSave = jest.fn();
const mockFlush = jest.fn().mockResolvedValue(undefined);
const mockCancel = jest.fn();

// Mock user data used by the container
const mockUser = {
  id: 'u1',
  firstName: 'Ola',
  lastName: 'Nordmann',
  email: 'ola@example.com',
  phone: null,
  avatarUrl: null,
  gender: 'male',
  language: 'no',
  preferences: { darkMode: false, newsletter: true },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock the userRepository used by the container (inline mock is fine here)
jest.mock('../../../repositories/userRepository', () => ({
  ensureTemplateUser: jest.fn().mockResolvedValue(mockUser),
  updateUser: jest.fn().mockResolvedValue(mockUser),
  createUser: jest.fn().mockResolvedValue(mockUser),
}));

// Mock the debounced save hook so tests are deterministic and we can assert calls
jest.mock('../../../hooks/useDebouncedSave', () => ({
  useDebouncedSave: () => ({
    debouncedSave: mockDebouncedSave,
    flush: mockFlush,
    cancel: mockCancel,
  }),
}));

// Mock the screen component so the autosave behavior can be triggered from UI
jest.mock('../UserPerson.screen', () => {
  const React = require('react');
  const RN = require('react-native');

  // Minimal mock UI: exposes a control to trigger onFieldChange and onSave,
  // and renders the user's firstName so tests can wait for initialization.
  const UserPersonScreenMock = (props: any) =>
    React.createElement(
      RN.View,
      null,
      React.createElement(
        RN.TouchableOpacity,
        {
          testID: 'change-firstName',
          onPress: () => props.onFieldChange('firstName', 'Test'),
        },
        React.createElement(RN.Text, null, 'Change firstName')
      ),
      React.createElement(
        RN.TouchableOpacity,
        {
          testID: 'save',
          onPress: () => props.onSave && props.onSave(),
        },
        React.createElement(RN.Text, null, 'Save')
      ),
      React.createElement(RN.Text, { testID: 'user-name' }, props.user?.firstName ?? 'no-name')
    );

  return { UserPersonScreen: UserPersonScreenMock };
});

describe('UserPersonContainer autosave behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls debouncedSave when a field changes and flush on unmount', async () => {
    const { getByTestId, unmount } = render(React.createElement(UserPersonContainer));

    // Wait for initialization and mocked screen to render the user name
    await waitFor(() => {
      expect(getByTestId('user-name').props.children).toBe('Ola');
    });

    // Trigger the mocked onFieldChange from the mocked screen
    fireEvent.press(getByTestId('change-firstName'));

    // debouncedSave should be called with the partial update
    expect(mockDebouncedSave).toHaveBeenCalledWith({ firstName: 'Test' });

    // Unmount the container to trigger cleanup which should call flush()
    unmount();

    // Wait for flush to be called in the unmount cleanup
    await waitFor(() => {
      expect(mockFlush).toHaveBeenCalled();
    });

    // cancel should also be called in finally block
    expect(mockCancel).toHaveBeenCalled();
  });
});
