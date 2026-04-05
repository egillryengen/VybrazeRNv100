# User fields reference

This document lists all fields from the Hive `UserBasic` model, with technical metadata and UI guidance. Use this as the single source of truth when implementing TypeScript models, UI sections, and backend contracts. It reflects the current decision to simulate backend behavior during development.

> **Important implementation notes**
>
> - The project currently uses a simulated backend for development and testing. All backend‑dependent behaviors (verification, moderation, trust score calculation, business resolution) must be implemented in the simulated repository layer.
> - Fields marked **Display** are intended to be shown in the user profile UI.
> - Fields marked **System** are backend/system fields and should not be editable in the normal profile UI.
> - **Backend included** indicates whether the field must be stored/managed by the backend (or simulated backend).
> - `businessName` is shown in the UI only when `userBusinessId` has a value; the UI should display the business/organization name resolved from that id.
> - `password` is handled via a dedicated "Change password" flow. Do not include a plain editable password field in the main profile form.

---

## Field table

| Field                 | Type                 | Required | Hive comment / function                 |                         Shows in UI? | Display / System      | Backend included | Notes                                                                                         |
| --------------------- | -------------------- | -------- | --------------------------------------- | -----------------------------------: | --------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| id                    | String               | Yes      | Primary key, unique user id             |                                   No | System                | Yes              | Backend owns ID. In templates this may be fixed.                                              |
| givenName             | String?              | No       | First name                              |                                  Yes | Display               | Yes              | Editable by user.                                                                             |
| familyName            | String?              | No       | Last name                               |                                  Yes | Display               | Yes              | Editable by user.                                                                             |
| displayName           | String               | Yes      | Public display name                     |                                  Yes | Display               | Yes              | Must be validated (non-empty).                                                                |
| email                 | String               | Yes      | User email                              |                                  Yes | Display               | Yes              | Validate format; backend handles email verification.                                          |
| phoneNumber           | String?              | No       | Phone number                            |                                  Yes | Display               | Yes              | Store canonical international format; verification separate.                                  |
| phoneVerified         | bool                 | Yes      | Phone verification flag                 |                Yes (read-only badge) | Display               | Yes              | Backend sets after verification.                                                              |
| birthDate             | DateTime?            | No       | Birth date (required if type == Person) |                                  Yes | Display               | Yes              | Conditional validation when type === "Person".                                                |
| gender                | String?              | No       | Gender (required if type == Person)     |                                  Yes | Display               | Yes              | Conditional validation.                                                                       |
| bio                   | String?              | No       | Short profile description               |                                  Yes | Display               | Yes              | Enforce max length.                                                                           |
| city                  | String               | Yes      | City                                    |                                  Yes | Display               | Yes              | Validate presence.                                                                            |
| language              | String               | Yes      | Language preference                     |                                  Yes | Display               | Yes              | Also stored as defaultLocale if needed.                                                       |
| coordinates           | String?              | No       | GPS position (lat,lng)                  |   Optional (UI read-only by default) | Display               | Yes              | Prefer structured type (lat: number, lng: number) if editable. Clarify editability.           |
| photoUrl              | String?              | No       | Profile picture URL                     |                                  Yes | Display               | Yes              | Backend or storage service provides URL.                                                      |
| photosMeta            | Map<String,dynamic>? | No       | Photos metadata (EXIF, sizes, etc.)     |                                   No | System                | Yes              | Keep in backend; expose sanitized subset if UI needs thumbnails/dimensions.                   |
| visibility            | String               | Yes      | public / contacts / hidden              |                                  Yes | Display               | Yes              | Backend must enforce privacy rules.                                                           |
| moodStatus            | String?              | No       | Mood/status text                        |                                  Yes | Display               | Yes              | Optional; may be transient.                                                                   |
| createdAt             | DateTime             | Yes      | Created timestamp                       |                                   No | System                | Yes              | Backend sets.                                                                                 |
| updatedAt             | DateTime             | Yes      | Last updated timestamp                  |                                   No | System                | Yes              | Backend sets.                                                                                 |
| accountStatus         | String               | Yes      | active / suspended / deleted            |                                   No | System                | Yes              | Admin field; not user editable.                                                               |
| isBanned              | bool                 | Yes      | Banned flag                             |                                   No | System                | Yes              | Admin/moderation field.                                                                       |
| verifiedBadge         | bool                 | Yes      | Verified badge flag                     |                Yes (read-only badge) | Display               | Yes              | Backend/admin sets criteria.                                                                  |
| deviceBiometricLinkId | String?              | No       | Biometric device link id                |                                   No | System                | Yes              | Sensitive; backend only.                                                                      |
| defaultLocale         | String               | Yes      | Default locale / region                 |                     Yes (preference) | Display               | Yes              | Expose as user preference in settings.                                                        |
| lastLoginAt           | DateTime?            | No       | Last login timestamp                    |                                   No | System                | Yes              | Backend sets; not shown in profile UI.                                                        |
| trustScore            | double               | Yes      | Trust / reputation score                |                      Yes (read-only) | Display (read-only)   | Yes              | Calculated by backend; show to user but not editable.                                         |
| type                  | String               | Yes      | Person / Business / Organization        |                                  Yes | Display               | Yes              | Drives conditional validation and which fields are required. Default "Person".                |
| businessName          | String?              | No       | Business/organization name              | Yes (only if userBusinessId present) | Display (conditional) | Yes              | UI must resolve name from `userBusinessId`. Do not allow free edit unless user owns business. |
| password              | String?              | No       | Password (used for login)               |       Yes (via change password flow) | System (sensitive)    | Yes              | Do not store plain text. Implement separate change password flow.                             |
| userBusinessId        | String?              | No       | Relation to business/organization       |                        No (internal) | System                | Yes              | When present, UI shows businessName resolved from this id.                                    |

---

## UI sections mapping

Below is a recommended mapping of UI sections to fields. Implement each section as a presentational component that receives typed props (see types file plan).

### UserNameSection

- `givenName`, `familyName`, `displayName`

### UserPhotoSection

- `photoUrl`, show `verifiedBadge` as a read-only indicator

### UserBirthDateSection

- `birthDate` (validate age if required)

### UserGenderSection

- `gender`

### UserCitySection

- `city`, optionally show `coordinates` as read-only or editable after clarification

### UserLanguageSection

- `language`, `defaultLocale` (expose as preference)

### UserContactInfoSection

- `email`, `phoneNumber`, show `phoneVerified` badge

### UserVisibilitySection

- `visibility`

### UserPreferencesSection

- `moodStatus`, other preferences (not in Hive model yet)

### UserBusinessSection

- `type`, `businessName` (display only if `userBusinessId` exists)
- `userBusinessId` remains system field; UI shows resolved business name and link to business profile if applicable

### Security / Password

- Provide a **Change password** flow (current password, new password, confirm). Do not include `password` as a plain editable field in the main profile form. Use a dedicated modal/flow that calls a secure backend endpoint (or simulated backend endpoint during development).

---

## Backend (simulated) guidance for development

- **Simulated backend**: implement a repository layer that simulates backend behavior for verification, moderation, trust score calculation, and business resolution. This allows frontend development and tests to run without a live backend.
- **Validation**: Always validate conditional rules server‑side (e.g., `birthDate` and `gender` required when `type === "Person"`).
- **Password**: never accept or store `password` in plain text. Use a dedicated change password endpoint in the simulated backend that mimics hashing and validation.
- **photosMeta**: keep metadata in the simulated backend; expose a sanitized subset (e.g., `thumbnailUrl`, `width`, `height`) if UI needs it.
- **coordinates**: prefer structured geo type `{ lat: number, lng: number }` if editable. If stored as string, define canonical format (e.g., `"lat,lng"`).
- **privacy**: simulated backend must enforce `visibility` rules when returning user data to other simulated users.
- **moderation**: `accountStatus`, `isBanned`, `trustScore` (trustScore is visible to user but read‑only) should be handled by simulated admin flows or seeded data.

---

## TypeScript model plan (implementation ready)

- `User` — full model including system fields (used in store and backend DTOs).
- `UserDraft` — subset containing only display/editable fields used by the profile form (includes read‑only display fields like `phoneVerified`, `verifiedBadge`, `trustScore` as booleans/numbers for display).
- `UserPersonScreenProps` — `{ user: UserDraft; onSave: (draft: UserDraft) => Promise<void>; loading: boolean; error?: string }`
- `UserSectionProps<T>` — `{ value: T; onChange: (v: T) => void; readOnly?: boolean }`

---

## Open clarifications (if any)

1. **Coordinates editability** — confirm whether users should be able to edit coordinates or if they are system populated only. (Default: read‑only in UI; can be made editable later.)
2. **photosMeta exposure** — confirm which metadata fields (if any) the UI needs (thumbnail, dimensions). (Default: expose `thumbnailUrl` only.)
3. **Business name edit rules** — confirm whether a user can edit `businessName` directly or if it must be edited via the business entity flow. (Default: resolved from `userBusinessId`; not editable in user profile.)
4. **Password change UX** — confirm desired UX (modal vs separate screen). (Default: modal.)

---

End of file.
