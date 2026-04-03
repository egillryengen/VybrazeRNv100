// src/features/user/screens/UserPerson/__tests__/UserPerson.container.snapshot.test.tsx
/// <reference types="jest" />
/// <reference types="node" />
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { UserPersonContainer } from '../UserPerson.container';

// Use the manual mocks placed in __mocks__
// Jest will automatically use the module in __mocks__ when we call jest.mock with the module path.
jest.mock('../../../repositories/userRepository');
jest.mock('../../../hooks/useDebouncedSave');

// Mock the screen component so the snapshot focuses on container behavior
jest.mock('../UserPerson.screen', () => {
  const React = require('react');
  const RN = require('react-native');

  const UserPersonScreenMock = (props: any) =>
    React.createElement(
      RN.View,
      null,
      React.createElement(RN.Text, { testID: 'user-name' }, props.user?.firstName ?? 'no-name'),
      React.createElement(RN.Text, { testID: 'is-saving' }, String(Boolean(props.isSaving))),
      React.createElement(RN.Text, { testID: 'last-saved' }, props.lastSaved ?? '')
    );

  return { UserPersonScreen: UserPersonScreenMock };
});

test('UserPersonContainer snapshot', async () => {
  const { toJSON, getByTestId } = render(React.createElement(UserPersonContainer));

  // Wait for the container to initialize and render the mocked screen
  await waitFor(() => {
    expect(getByTestId('user-name').props.children).toBe('Ola');
  });

  expect(toJSON()).toMatchSnapshot();
});
