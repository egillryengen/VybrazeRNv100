// src/features/user/constants.ts
// Constants used by the user feature for seeding, temporary local ids and defaults.

export const TEMPLATE_USER_ID = '1'; // Only for seed/migration; do not hardcode in UI.
export const TEMP_LOCAL_PREFIX = 'local-'; // Prefix for temporary client-side ids during registration.
export const DEFAULT_USER_FIRST_NAME = 'Person';
export const DEFAULT_USER_VISIBILITY = 'private' as const;
export const DEFAULT_USER_LANGUAGE = 'no';
