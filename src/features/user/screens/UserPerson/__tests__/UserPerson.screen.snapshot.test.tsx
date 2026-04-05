// File: src/features/user/screens/UserPerson/__tests__/UserPerson.screen.snapshot.test.tsx
/// <reference types="jest" />
/// <reference types="node" />

/**
 * Snapshot test for UserPersonScreen.
 *
 * Strategy:
 * - Use runtime require to respect Jest mocks (samme mønster som containeren).
 * - Provide a stable mock user object.
 * - Render screen directly (presentational only).
 * - Snapshot skal være stabil og enkel å vedlikeholde.
 */

import React from 'react';
import renderer from 'react-test-renderer';

// Runtime require to ensure Jest mocks are respected
const loadScreen = () => {
  const mod = require('../UserPerson.screen');
  return mod.UserPersonScreen || mod.default;
};

describe('UserPersonScreen snapshot', () => {
  it('renders correctly with full props', () => {
    const Screen = loadScreen();

    const mockUser = {
      id: 'u1',
      photoUrl: 'https://example.com/photo.jpg',
      givenName: 'Ola',
      familyName: 'Nordmann',
      birthDate: '1990-01-01',
      gender: 'male',
      city: 'Oslo',
      language: 'no',
      phoneNumber: '12345678',
      email: 'ola@example.com',
      visibility: 'public',
      preferences: {
        receiveNewsletter: true,
        darkMode: false,
      },
      businessName: 'Vybraze AS',
      title: 'Developer',
    };

    const tree = renderer
      .create(
        <Screen
          user={mockUser}
          onFieldChange={() => {}}
          updatePartial={async () => mockUser}
          onSave={async () => {}}
          isSaving={false}
          lastSaved={null}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
