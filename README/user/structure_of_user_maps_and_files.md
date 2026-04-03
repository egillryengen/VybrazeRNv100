Del 2 – Summary of work on user structure – Leave as is
Short conclusion: The UserPerson feature has been restored, stabilized and verified locally. TypeScript compiles without errors, all Jest tests pass, and we have removed the most common sources of flakiness in tests (async state updates after teardown). Below is an updated, action‑oriented report reflecting what was done and what remains.

---

Changes and files now present and verified

Container and screen
• src/features/user/screens/UserPerson/UserPerson.container.tsx — Container with async guards (isMountedRef) and autosave flush/cancel. Export: export const UserPersonContainer.
• src/features/user/screens/UserPerson/UserPerson.screen.tsx — Presentational screen. Export: export const UserPersonScreen.

UI sections
• src/features/user/screens/UserPerson/sections/ contains:
o UserNameSection.tsx; UserPhotoSection.tsx; UserBirthDateSection.tsx; UserGenderSection.tsx; UserCitySection.tsx; UserLanguageSection.tsx; UserContactInfoSection.tsx; UserVisibilitySection.tsx; UserPreferencesSection.tsx; UserBusinessSection.tsx.

Fallback and test support
• components/TestVybraze.tsx — temporary test screen (kept in repo, planned cleanup PR).
• tests/App-test.tsx — updated test: mock of userRepository (ensureTemplateUser, updateUser, createUser) and use of await act(...) / waitFor to wait for async init.

Theme and barrel files
• src/common/theme/appColors.ts; appTextStyles.ts; appTheme.ts — verified and tested.
• src/common/theme/index.ts — barrel exporting theme modules.

Components barrel
• src/common/components/index.ts — re-exports components from their actual locations to resolve previous import errors.

Tests added and updated
• src/features/user/screens/UserPerson/**tests**/UserPerson.container.snapshot.test.tsx

- Snapshot test for UserPersonContainer using manual module mocks and a minimal screen mock.
  • src/features/user/screens/UserPerson/**tests**/UserPerson.container.autosave.test.tsx
- Unit test verifying autosave behavior: debouncedSave called on field change; flush and cancel called on unmount.
  • src/features/user/repositories/**mocks**/userRepository.ts
- Manual Jest mock for repository functions: ensureTemplateUser, updateUser, createUser; exports mockUser.
  • src/features/user/hooks/**mocks**/useDebouncedSave.ts
- Manual Jest mock for the debounced save hook returning debouncedSave, flush, cancel.
  • src/common/theme/**tests**/appColors.test.ts
  • src/common/theme/**tests**/appTextStyles.test.ts
  • src/common/theme/**tests**/appTheme.test.ts
  All of the above run green locally.

Notes on test changes and rationale
• Centralized manual mocks: We added module mocks under **mocks** for userRepository and useDebouncedSave to avoid inline factory pitfalls and to make tests deterministic and reusable.
• Jest mock factory restriction: Tests that previously referenced outer-scope variables inside jest.mock factories were refactored. Where inline factories remained, they do not reference out-of-scope variables.
• Async teardown flakiness: Container uses an isMountedRef guard to prevent state updates after unmount; tests use waitFor/act and explicit flush mocks to ensure deterministic behavior.
• Snapshot tests: The container snapshot test uses a minimal screen mock to focus the snapshot on container behavior and avoid snapshot noise from presentational components.

---

Verification and status

Commands run locally
npx tsc --noEmit
npx jest --clearCache
npx jest --runInBand --detectOpenHandles

Result: TypeScript reports no errors; all Jest suites pass. Snapshots updated where appropriate and tests are stable after mocking and using waitFor/act.

Git status before commit
• Several changes were staged and some files were untracked. Work is ready to be committed on a dedicated branch.

---

Strategy for completion and stabilization

Goal: Robust, testable and type-safe User feature integrated into app navigation and CI pipeline.

Prioritized tasks

1.  Type safety — complete and verify all User and props types; run npx tsc --noEmit.
2.  Loading and error guards — ensure all components have clear loading/error states (use LoadingIndicator/guards).
3.  Mocking and testability — standardize mocks for repository and autosave in test setup (module mocks under **mocks**).
4.  Integration in navigation — register UserPersonContainer in the app navigator and verify backstack behavior.
5.  CI and premerge — add CI jobs that run npx tsc --noEmit, yarn lint, npx jest; block merges on failures.
6.  Documentation and cleanup — add README in src/features/user/; remove TestVybraze.tsx in a separate cleanup PR.

---

Immediate next actions and checklist

Perform now and mark when complete:
• [ ] Create branch strukturering_1e and commit all intended changes.
git checkout -b strukturering_1e
git add -A
git commit -m "chore: snapshot repo state with tests green; strukturering_1e"
git push -u origin strukturering_1e
• [ ] Run npx tsc --noEmit and fix any type issues that appear.
• [ ] Ensure loading guard in UserPersonContainer:
if (!user) {
return <LoadingIndicator />;
}
• [ ] Add at least one snapshot test for UserPersonScreen with mocked props.
• [ ] Open PR against main describing recovery, test coverage, and temporary files (e.g., TestVybraze).

When PR is opened:
• [ ] Run CI; fix any CI failures (case sensitivity, paths, jest moduleNameMapper).
• [ ] After approval: open a cleanup PR to remove components/TestVybraze.tsx and other temporary artifacts.

---

Recommendations for stable CI and future work

• Standardize imports: use either baseUrl: "src" in tsconfig.json with corresponding Jest moduleNameMapper, or keep consistent relative imports across the codebase.
• Global test setup: consider moving common mocks (e.g., userRepository) into a centralized jest.setup.ts to ensure consistent behavior across tests.
• Automate checks: add GitHub Actions that run npx tsc --noEmit, yarn lint, npx jest --runInBand.
• Case sensitivity: run a grep/scan for case mismatches before merging to avoid Linux CI failures.
• Coverage policy: consider adding a coverage threshold for new code to prevent regressions.

---

Appendix: Files created or modified in this effort (paths)

• src/features/user/screens/UserPerson/UserPerson.container.tsx
• src/features/user/screens/UserPerson/UserPerson.screen.tsx
• src/features/user/screens/UserPerson/sections/UserNameSection.tsx
• src/features/user/screens/UserPerson/sections/UserPhotoSection.tsx
• src/features/user/screens/UserPerson/sections/UserBirthDateSection.tsx
• src/features/user/screens/UserPerson/sections/UserGenderSection.tsx
• src/features/user/screens/UserPerson/sections/UserCitySection.tsx
• src/features/user/screens/UserPerson/sections/UserLanguageSection.tsx
• src/features/user/screens/UserPerson/sections/UserContactInfoSection.tsx
• src/features/user/screens/UserPerson/sections/UserVisibilitySection.tsx
• src/features/user/screens/UserPerson/sections/UserPreferencesSection.tsx
• src/features/user/screens/UserPerson/sections/UserBusinessSection.tsx
• src/features/user/screens/UserPerson/**tests**/UserPerson.container.snapshot.test.tsx
• src/features/user/screens/UserPerson/**tests**/UserPerson.container.autosave.test.tsx
• src/features/user/repositories/**mocks**/userRepository.ts
• src/features/user/hooks/**mocks**/useDebouncedSave.ts
• src/common/theme/appColors.ts
• src/common/theme/appTextStyles.ts
• src/common/theme/appTheme.ts
• src/common/theme/index.ts
• src/common/components/index.ts
• components/TestVybraze.tsx (temporary)
• tests/App-test.tsx (updated)

---

This document is an updated, action‑oriented snapshot of what has been done and what remains. Everything marked as "done" has been verified locally with TypeScript and Jest.

If you want, I can now:
• generate a ready‑to‑paste GitHub PR description (English) using the summary above, or
• produce a GitHub Actions YAML file that runs TypeScript, lint and Jest for CI.

Tell me which of the two you want next and I will produce the full file ready to paste.
