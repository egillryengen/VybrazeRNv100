User Loading Flow
┌──────────────────────────┐
│   UserPerson.container   │
└──────────────┬───────────┘
               │
               ▼
     ensureTemplateUser()
               │
               ▼
         getUser()
               │
               ▼
     Local state initialized
               │
               ▼
  Pass props to UserPerson.screen
