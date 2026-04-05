// src/features/user/screens/UserPerson/__tests__/UserPerson.container.autosave.test.tsx
/// <reference types="jest" />
/// <reference types="node" />
import React from 'react';
import {act} from 'react-test-renderer';
import {render, waitFor, fireEvent} from '@testing-library/react-native';

jest.setTimeout(10000);

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
  preferences: {darkMode: false, newsletter: true},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock the userRepository used by the container (inline mock is fine here)
jest.mock('../../../repositories/userRepository', () => {
  const ensureTemplateUser = jest.fn().mockResolvedValue(mockUser);
  const updateUser = jest.fn().mockResolvedValue(mockUser);
  const createUser = jest.fn().mockResolvedValue(mockUser);

  return {
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
});

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
  // Require React inside the factory to avoid referencing out-of-scope variables
  const ReactLocal = require('react');
  const RN = require('react-native');

  // Minimal mock UI: exposes a control to trigger onFieldChange and onSave,
  // and renders the user's firstName so tests can wait for initialization.
  const UserPersonScreenMock = (props: any) =>
    ReactLocal.createElement(
      RN.View,
      null,
      ReactLocal.createElement(
        RN.TouchableOpacity,
        {
          testID: 'change-firstName',
          onPress: () => props.onFieldChange('firstName', 'Test'),
        },
        ReactLocal.createElement(RN.Text, null, 'Change firstName'),
      ),
      ReactLocal.createElement(
        RN.TouchableOpacity,
        {
          testID: 'save',
          onPress: () => props.onSave && props.onSave(),
        },
        ReactLocal.createElement(RN.Text, null, 'Save'),
      ),
      ReactLocal.createElement(
        RN.Text,
        {testID: 'user-name'},
        props.user?.firstName ?? 'no-name',
      ),
    );

  return {UserPersonScreen: UserPersonScreenMock};
});

// Import container after mocks so module imports are mocked correctly
import {UserPersonContainer} from '../UserPerson.container';

describe('UserPersonContainer autosave behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls debouncedSave when a field changes and flush on unmount', async () => {
    // Require the mocked repo BEFORE rendering to avoid race conditions
    const repo = require('../../../repositories/userRepository');

    // Ensure the mock implementations definitely resolve to mockUser
    if (repo && typeof repo.ensureTemplateUser === 'function') {
      repo.ensureTemplateUser.mockResolvedValue?.(mockUser);
    }
    if (repo && typeof repo.createUser === 'function') {
      repo.createUser.mockResolvedValue?.(mockUser);
    }

    const {getByTestId, findByTestId, unmount} = render(
      React.createElement(UserPersonContainer),
    );

    // Flush pending microtasks to let useEffect start
    await act(async () => {
      await Promise.resolve();
    });

    // Ensure the repository mock was invoked and initialization started
    await waitFor(
      () => {
        expect(repo.ensureTemplateUser).toHaveBeenCalled();
      },
      {timeout: 2000},
    );

    // Wait for the component to render the loaded user (longer timeout to avoid flakes)
    const userNameEl = await findByTestId('user-name', undefined, {
      timeout: 2000,
    });
    expect(userNameEl).toBeTruthy();
    expect(userNameEl.props.children).toBe('Ola');

    // Trigger the mocked onFieldChange from the mocked screen
    fireEvent.press(getByTestId('change-firstName'));

    // debouncedSave should be called with the partial update
    expect(mockDebouncedSave).toHaveBeenCalledWith({firstName: 'Test'});

    // Unmount the container to trigger cleanup which should call flush()
    unmount();

    // Wait for flush to be called in the unmount cleanup
    await waitFor(
      () => {
        expect(mockFlush).toHaveBeenCalled();
      },
      {timeout: 2000},
    );

    // cancel should also be called in finally block
    expect(mockCancel).toHaveBeenCalled();
  });
});
