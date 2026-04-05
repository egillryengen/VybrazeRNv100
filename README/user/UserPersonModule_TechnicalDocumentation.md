# UserPerson Module – Technical Documentation

## Purpose
The UserPerson module is the core profile editing interface in Vybraze. It allows users to view and update personal information that defines their identity, trust level, and visibility across the platform. This module is essential for onboarding, personalization, safety, and access control.

## Functional Description
The module supports editing of:

- Name
- Birthdate
- Gender
- City
- Language
- Profile photo
- Contact information (email, phone)
- Preferences
- Visibility settings
- Business information (if applicable)

It integrates with Vybraze’s trust model, where verified identity and complete profile data influence:

- Which vibes a user can see
- How they appear to others
- Their trust score
- Access to public/professional events

## Architecture

### 1. Container (`UserPerson.container.tsx`)
Responsibilities:
- Load user data from `userRepository`
- Initialize template user if needed
- Manage local state
- Provide `onFieldChange`, `updatePartial`, and `onSave`
- Trigger autosave via `useDebouncedSave`
- Handle loading and fallback UI
- Pass props to the screen

### 2. Screen (`UserPerson.screen.tsx`)
Responsibilities:
- Render UI layout
- Display all profile sections
- Forward field changes to container
- Remain stateless and presentation-focused

### 3. Sections
Each field is implemented as a dedicated component:
UserNameSection
UserBirthDateSection
UserGenderSection
UserCitySection
UserLanguageSection
UserPhotoSection
UserContactInfoSection
UserPreferencesSection
UserBusinessSection
UserVisibilitySection

Sections:
- Receive current value + callbacks
- Render input UI
- Validate and forward changes
- Remain isolated for maintainability

### 4. Hooks
- `useUser` – loads user data
- `useAutoSaveUser` – manages autosave lifecycle
- `useDebouncedSave` – debounces save operations

### 5. Repository
`userRepository` provides:
- `ensureTemplateUser`
- `getUser`
- `updateUser`
- Mocked versions for testing

## Autosave Logic
Autosave is implemented through:

1. `onFieldChange` updates local state
2. `useDebouncedSave` waits for inactivity
3. `updatePartial` persists changes
4. UI shows saving indicators

This ensures a smooth editing experience without explicit save actions.

## Testing Strategy

### Snapshot Tests
- `UserPerson.screen.snapshot.test.tsx`
- `UserPerson.container.snapshot.test.tsx`

### Autosave Tests
- `UserPerson.container.autosave.test.tsx`

### Mocking Strategy
- `userRepository` mocked globally in `jest.setup.js`
- `useDebouncedSave` mocked globally
- Runtime `require()` ensures mocks load correctly

## File Structure
UserPerson/
│   UserPerson.container.tsx
│   UserPerson.screen.tsx
│
├── sections/
│   UserNameSection.tsx
│   UserBirthDateSection.tsx
│   UserGenderSection.tsx
│   UserCitySection.tsx
│   UserLanguageSection.tsx
│   UserPhotoSection.tsx
│   UserContactInfoSection.tsx
│   UserPreferencesSection.tsx
│   UserBusinessSection.tsx
│   UserVisibilitySection.tsx
│
└── tests/
UserPerson.container.autosave.test.tsx
UserPerson.container.snapshot.test.tsx
UserPerson.screen.snapshot.test.tsx


## Developer Notes
- Always modify container logic before screen logic
- Never duplicate logic across sections
- Use repository mocks for all tests
- Keep UI changes minimal and reversible
- Follow the existing autosave pattern strictly

This module is central to user identity and must remain stable, predictable, and well-tested.
