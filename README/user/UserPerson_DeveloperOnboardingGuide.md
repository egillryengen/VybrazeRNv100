# Developer Onboarding Guide – User Feature & UserPerson Module

Welcome to the Vybraze User Feature codebase.  
This guide will help new developers quickly understand the structure, responsibilities, and workflows of the User feature and the UserPerson module.

---

## 1. Project Location

All user-related code is located in:
src/features/user/


The UserPerson module is located in:
src/features/user/screens/UserPerson/


---

## 2. Core Concepts

### 2.1 User Feature Purpose
The User feature provides the identity layer for Vybraze.  
It manages:

- Profile data  
- Verification status  
- Trust score inputs  
- Visibility settings  
- Preferences  
- Contact information  

This data influences feed personalization, vibe access, invitations, and safety.

### 2.2 UserPerson Module Purpose
UserPerson is the **profile editing interface**.  
It allows users to update:

- Name  
- Birthdate  
- Gender  
- City  
- Language  
- Photo  
- Contact info  
- Preferences  
- Visibility  
- Business info  

It uses autosave, debounced updates, and a repository-driven data model.

---

## 3. Architecture Overview

### 3.1 Containers
Containers orchestrate:

- Data loading  
- State management  
- Autosave  
- Partial updates  
- Error fallback  

Start here when modifying logic:
UserPerson.container.tsx


### 3.2 Screens
Screens are stateless UI components:
UserPerson.screen.tsx


They render layout and forward events to the container.

### 3.3 Sections
Each profile field is isolated in its own component:
sections/


This ensures maintainability and clear separation of concerns.

### 3.4 Hooks
Hooks encapsulate logic:

- `useUser` – loads user data  
- `useAutoSaveUser` – manages autosave lifecycle  
- `useDebouncedSave` – debounces save operations  

### 3.5 Repository
The repository abstracts data access:
repositories/userRepository.ts


It provides:

- ensureTemplateUser  
- getUser  
- updateUser  

Mocked versions exist for testing.

---

## 4. Data Flow

### 4.1 Loading
1. Container calls `ensureTemplateUser`  
2. Container calls `getUser`  
3. State is initialized  
4. Screen receives props  

### 4.2 Updating
1. Section triggers `onFieldChange`  
2. Container updates state  
3. Debounce timer starts  
4. updatePartial persists changes  

### 4.3 Rendering
Screen renders sections with:

- value  
- onChange  
- validation  

---

## 5. Testing

### 5.1 Snapshot Tests
Located in:
tests/UserPerson.screen.snapshot.test.tsx
tests/UserPerson.container.snapshot.test.tsx


### 5.2 Autosave Tests
Located in:
UserPerson.container.autosave.test.tsx


### 5.3 Mocking Strategy
Global mocks in:
jest.setup.js


Mocks:

- userRepository  
- useDebouncedSave  

Runtime `require()` ensures correct mock loading.

---

## 6. Development Workflow

### 6.1 Before coding
- Understand container logic  
- Review section structure  
- Check repository API  
- Run tests  

### 6.2 While coding
- Modify container first  
- Keep screens stateless  
- Avoid duplicating logic  
- Follow autosave pattern  

### 6.3 After coding
Run:
npx tsc --noEmit
npx jest --runInBand


Commit only when everything is green.

---

## 7. Best Practices

- Keep UI changes minimal and reversible  
- Never bypass repository layer  
- Keep sections isolated  
- Maintain consistent naming  
- Use TypeScript strictly  
- Ensure snapshot tests remain stable  
- Follow existing patterns for autosave and partial updates  

---

## 8. Troubleshooting

### Autosave not triggering
- Check `useDebouncedSave` mock  
- Ensure `onFieldChange` updates state  
- Verify debounce delay  

### Snapshot mismatch
- Update snapshots only when UI changes intentionally  

### Repository not mocked
- Ensure jest.setup.js is loaded via `setupFiles`  

---

## 9. Summary

The User feature and UserPerson module form the backbone of user identity in Vybraze.  
Understanding containers, screens, sections, hooks, and repositories is essential for contributing effectively.

This guide provides the structure and workflow needed to onboard quickly and confidently.
