Rendering Flow
┌──────────────────────────────┐
│ UserPerson.container.tsx     │
└───────────────┬──────────────┘
                ▼
   UserPerson.screen.tsx
                │
                ▼
        Sections rendered
                │
                ▼
   Each section receives:
   - value
   - onChange callback
   - validation rules
