# 📘 **Vybraze Developer Handbook (English)**

```md
# Vybraze Developer Handbook

## 1. Introduction

This handbook provides a complete technical overview for developers working on the Vybraze codebase. It explains the architecture, module structure, coding conventions, data flow, testing strategy, autosave pattern, repository layer, and best practices. The goal is to ensure that any developer—new or experienced—can quickly understand the system and contribute safely and effectively.

Vybraze is built as a modular, trust‑centric social platform. The User feature and UserPerson module form the identity foundation of the entire application.

---

## 2. High-Level Architecture

Vybraze uses a **feature‑based modular architecture**:

```
features/
   user/
   vibes/
   calendar/
   contacts/
   settings/
   ...
```

Each feature contains:

- Screens  
- Containers  
- Hooks  
- Repositories  
- Components  
- Tests  
- Mocks  

This ensures:

- High maintainability  
- Low coupling  
- Clear ownership  
- Safe refactoring  

---

## 3. Architectural Principles

### 3.1 Container–Screen Pattern

Vybraze follows a strict separation of concerns:

#### **Container**
- Loads data  
- Manages state  
- Orchestrates logic  
- Calls repository  
- Triggers autosave  
- Passes props to the screen  

#### **Screen**
- Stateless  
- Pure UI  
- Receives props  
- Emits events back to container  

This pattern keeps UI clean and logic predictable.

---

### 3.2 Section-Based UI

Each profile field is implemented as an isolated section component:

```
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
```

Benefits:

- Easy to test  
- Easy to extend  
- No duplication  
- Clear boundaries  

---

### 3.3 Repository Layer

The repository layer is the **single source of truth** for data access.

Responsibilities:

- Fetch user data  
- Persist updates  
- Create template user  
- Abstract API/storage details  
- Provide a stable interface for containers  

Screens must **never** call repositories directly.

---

### 3.4 Hooks

Hooks encapsulate reusable logic:

- `useUser` → loads user data  
- `useAutoSaveUser` → manages autosave lifecycle  
- `useDebouncedSave` → debounces save operations  

Hooks must be:

- Pure  
- Testable  
- UI‑agnostic  

---

## 4. Data Flow

### 4.1 User Loading Flow

1. Container calls `ensureTemplateUser`  
2. Container calls `getUser`  
3. Local state is initialized  
4. Screen receives props  
5. Sections render with values and callbacks  

---

### 4.2 Field Update Flow

1. User edits a field  
2. Section calls `onFieldChange`  
3. Container updates local state  
4. Debounce timer starts  
5. `updatePartial` persists changes  
6. Repository updates user data  

---

### 4.3 Autosave Pattern

Autosave is a core part of the UserPerson module.

Flow:

```
onFieldChange → update local state → debounce → updatePartial → repository.updateUser
```

Autosave must:

- Never block UI  
- Never fire too frequently  
- Always be reversible  
- Always be tested  

---

## 5. Testing Strategy

Vybraze uses three main test types:

### ✔ Snapshot Tests  
Ensure UI stability.

### ✔ Functional Tests  
Validate container logic and autosave behavior.

### ✔ Mock-Based Tests  
Isolate repository and hook behavior.

---

### 5.1 Test Structure

```
__tests__/
   *.snapshot.test.tsx
   *.autosave.test.tsx
   *.test.tsx
```

---

### 5.2 Mocking Strategy

Global mocks are defined in:

```
jest.setup.js
```

Mocks include:

- `userRepository`
- `useDebouncedSave`
- React Native internals (Animated, LayoutAnimation)

This ensures:

- Stable tests  
- No network calls  
- No side effects  

---

## 6. Coding Conventions

### 6.1 TypeScript

- Always use explicit types  
- Never use `any`  
- Avoid implicit return types  
- Use `interface` for models  
- Use `type` for unions  

---

### 6.2 React Native

- Screens must be stateless  
- Containers must be stateful  
- Sections must be small and isolated  
- No inline functions in JSX  
- No business logic in UI components  

---

### 6.3 File Naming

- Files: camelCase  
- Components: PascalCase  
- Hooks: camelCase with `use` prefix  
- Tests: `<name>.test.tsx`  

---

## 7. Developer Onboarding

### 7.1 First Steps

1. Install dependencies  
2. Run the project  
3. Run the test suite  
4. Read `UserPerson.container.tsx`  
5. Review repository layer  
6. Explore section components  

---

### 7.2 Key Files to Understand

```
UserPerson.container.tsx
UserPerson.screen.tsx
sections/*
hooks/*
repositories/userRepository.ts
jest.setup.js
```

---

### 7.3 Key Concepts to Understand

- Container–screen separation  
- Autosave pattern  
- Repository abstraction  
- Mocking strategy  
- Section‑based UI  

---

## 8. Common Pitfalls

### ❌ Logic inside UI components  
UI must remain pure.

### ❌ Direct API calls inside sections  
Only repositories may access data sources.

### ❌ Missing mocks in tests  
All tests must use mocks.

### ❌ Duplicated logic  
Use hooks and repository functions.

### ❌ Modifying screen before container  
All logic belongs in the container.

---

## 9. Best Practices

- Keep UI changes minimal and reversible  
- Never bypass the repository layer  
- Keep sections isolated and focused  
- Follow naming conventions  
- Use TypeScript strictly  
- Update snapshots only when UI changes intentionally  
- Maintain predictable autosave behavior  

---

## 10. Summary

This handbook provides developers with:

- A complete understanding of the User feature  
- A safe way to navigate the codebase  
- Clear architectural principles  
- A robust workflow for development  
- A shared standard for quality  

Vybraze is built for:

- Modularity  
- Testability  
- Predictability  
- Scalability  
- Trust and safety  

With this handbook, any developer can contribute confidently and effectively.
```
