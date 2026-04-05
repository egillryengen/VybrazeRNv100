# User Feature – Overview

## Purpose
The User feature in Vybraze provides the foundational identity layer for the entire platform. It manages user profile data, trust signals, verification status, and personal preferences that influence visibility, access, and personalization across the app. This feature ensures that every user has a consistent, secure, and trustworthy identity that integrates seamlessly with event discovery, vibe creation, invitations, and safety mechanisms.

## Functional Scope
The User feature covers:

- Personal profile data (name, birthdate, gender, language, city, photo)
- Contact information (email, phone number)
- Verification status (biometric, ID-based)
- Trust score components
- Visibility and privacy settings
- User preferences (language, communication, profile visibility)
- Profile editing flows
- Autosave and partial updates
- Repository-driven data access
- UI components for profile editing
- Test coverage for container, screen, and autosave logic

This feature is tightly integrated with the platform’s trust model, recommendation engine, and access control mechanisms.

## Architecture Overview
The User feature follows a modular, layered architecture:

### 1. **Screens**
Located in:
src/features/user/screens/UserPerson
Screens are responsible for rendering UI and orchestrating user interactions. They do not contain business logic.

### 2. **Container Components**
- Handle data loading
- Manage state
- Connect to repositories
- Trigger autosave
- Provide props to screens

### 3. **Sections**
Each profile field is implemented as an isolated section component:
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

This ensures maintainability and clear separation of concerns.

### 4. **Hooks**
Located in:
src/features/user/hooks
Key hooks:
- `useUser` – loads and exposes user data
- `useAutoSaveUser` – manages autosave logic
- `useDebouncedSave` – debounces save operations

### 5. **Repository Layer**
Located in:
src/features/user/repositories/userRepository.ts
Responsible for:
- Fetching user data
- Persisting updates
- Ensuring template user creation
- Providing a stable API for the feature

### 6. **Testing Strategy**
The User feature includes:
- Snapshot tests for screen and container
- Autosave behavior tests
- Mocked repository and debounced save hook
- Runtime `require()` strategy to ensure Jest mocks are respected

Tests are located in:
src/features/user/screens/UserPerson/tests
src/features/user/hooks/tests

## Data Flow
1. Container loads user data from `userRepository`
2. Container passes data + callbacks to screen
3. Screen renders sections
4. Sections call `onFieldChange`
5. Container updates local state
6. Autosave triggers via `useDebouncedSave`
7. Repository persists changes

## Integration with Vybraze Platform
The User feature directly influences:

- Vibe discovery personalization
- Trust score visibility
- Access to public/professional vibes
- Invitation eligibility
- Safety and reporting flows
- Calendar and RSVP behavior

A complete and accurate profile is essential for optimal user experience.

## Developer Onboarding
To work on this feature:

1. Start in the container (`UserPerson.container.tsx`)
2. Review the screen (`UserPerson.screen.tsx`)
3. Explore sections for field-specific logic
4. Understand autosave via `useAutoSaveUser`
5. Review repository mocks before writing tests
6. Run:
npx tsc --noEmit
npx jest --runInBand


This structure ensures predictable behavior, maintainability, and a clear mental model for new developers.
