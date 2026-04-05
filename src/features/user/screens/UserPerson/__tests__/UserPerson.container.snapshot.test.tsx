// File: src/features/user/screens/UserPerson/__tests__/UserPerson.container.snapshot.test.tsx
/// <reference types="jest" />
/// <reference types="node" />
/**
 * Snapshot test for UserPersonContainer.
 *
 * Strategy:
 * - Register module mocks first (jest.mock(...)).
 * - Configure mock implementations (repo.ensureTemplateUser) BEFORE requiring the container.
 * - Require the container once (no jest.resetModules / jest.isolateModules).
 * - Render the container and assert on the mocked screen output.
 *
 * Replace the existing file with this block.
 */

import React from 'react';
import {render, waitFor} from '@testing-library/react-native';

// Register module mocks so Jest uses the manual mocks under __mocks__
jest.mock('../../../repositories/userRepository');
jest.mock('../../../hooks/useDebouncedSave');

// Provide a lightweight mock for the presentational screen.
// Use require inside factory to avoid out-of-scope imports.
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
        // The container passes a draft/user; adapt to both shapes
        props.user?.firstName ?? props.user?.givenName ?? 'no-name',
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

test('UserPersonContainer snapshot', async () => {
  // Configure the repository mock BEFORE requiring the container so the container
  // will use the mocked implementation during its initialization.
  const repo = require('../../../repositories/userRepository');

  // Ensure the function is a jest.fn and set the resolved value for this test.
  // If the mock file already exports jest.fn, this will override the implementation.
  if (repo) {
    // Defensive: if ensureTemplateUser is not a jest.fn, replace it with one.
    if (
      typeof repo.ensureTemplateUser !== 'function' ||
      !repo.ensureTemplateUser.mock
    ) {
      repo.ensureTemplateUser = jest.fn().mockResolvedValue({
        id: 'u1',
        givenName: 'Ola',
        firstName: 'Ola',
        lastName: 'Nordmann',
        displayName: 'Ola Nordmann',
        email: 'ola@example.com',
        city: '',
        language: 'en',
        defaultLocale: 'en_US',
        visibility: 'public',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accountStatus: 'active',
        isBanned: false,
        phoneVerified: false,
        verifiedBadge: false,
        trustScore: 0,
        type: 'Person',
      });
    } else {
      // If it's already a jest.fn, just set the resolved value
      repo.ensureTemplateUser.mockResolvedValue({
        id: 'u1',
        givenName: 'Ola',
        firstName: 'Ola',
        lastName: 'Nordmann',
        displayName: 'Ola Nordmann',
        email: 'ola@example.com',
        city: '',
        language: 'en',
        defaultLocale: 'en_US',
        visibility: 'public',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accountStatus: 'active',
        isBanned: false,
        phoneVerified: false,
        verifiedBadge: false,
        trustScore: 0,
        type: 'Person',
      });
    }
  }

  // Require the container after mock configuration so the container picks up the mocked repo.
  // Use require (CommonJS) to ensure mocks are applied; do not call jest.resetModules/isolateModules.
  const {UserPersonContainer} = require('../UserPerson.container');

  const {toJSON, getByTestId} = render(<UserPersonContainer />);

  // Wait for initialization and the mocked screen to render
  await waitFor(() => {
    expect(getByTestId('user-name').props.children).toBe('Ola');
  });

  expect(toJSON()).toMatchSnapshot();
});
