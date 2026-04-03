// src/features/user/screens/UserPerson/__tests__/UserPerson.container.snapshot.test.tsx
/// <reference types="jest" />
/// <reference types="node" />
import React from 'react';
import {render, waitFor} from '@testing-library/react-native';

// Use manual mocks in __mocks__ (jest will pick them up) but ensure they are configured before render
jest.mock('../../../repositories/userRepository');
jest.mock('../../../hooks/useDebouncedSave');

// Mock the screen component; require React inside factory to avoid out-of-scope errors
jest.mock('../UserPerson.screen', () => {
  const ReactLocal = require('react');
  const RN = require('react-native');

  const UserPersonScreenMock = (props: any) =>
    ReactLocal.createElement(
      RN.View,
      null,
      ReactLocal.createElement(
        RN.Text,
        {testID: 'user-name'},
        props.user?.firstName ?? 'no-name',
      ),
      ReactLocal.createElement(
        RN.Text,
        {testID: 'is-saving'},
        String(Boolean(props.isSaving)),
      ),
      ReactLocal.createElement(
        RN.Text,
        {testID: 'last-saved'},
        props.lastSaved ?? '',
      ),
    );

  return {UserPersonScreen: UserPersonScreenMock};
});

// Import container AFTER mocks so jest.mock takes effect
import {UserPersonContainer} from '../UserPerson.container';

test('UserPersonContainer snapshot', async () => {
  // Ensure the manual mock resolves to a user before rendering to avoid race conditions
  const repo = require('../../../repositories/userRepository');
  if (repo && typeof repo.ensureTemplateUser === 'function') {
    repo.ensureTemplateUser.mockResolvedValue?.({
      id: 'u1',
      firstName: 'Ola',
      lastName: 'Nordmann',
      email: 'ola@example.com',
    });
  }

  const {toJSON, getByTestId} = render(
    React.createElement(UserPersonContainer),
  );

  // Wait for initialization and the mocked screen to render
  await waitFor(() => {
    expect(getByTestId('user-name').props.children).toBe('Ola');
  });

  expect(toJSON()).toMatchSnapshot();
});
