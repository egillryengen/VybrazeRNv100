UserPerson Module
┌──────────────────────────────────────────────────────────┐
│                    UserPerson Module                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │              UserPerson.container.tsx              │   │
│  │  - Loads user data                                 │   │
│  │  - Manages state                                   │   │
│  │  - Autosave via useDebouncedSave                   │   │
│  │  - updatePartial / onFieldChange                   │   │
│  └───────────────┬────────────────────────────────────┘   │
│                  │                                          │
│  ┌───────────────▼──────────────────────────────────────┐   │
│  │               UserPerson.screen.tsx                   │   │
│  │  - Stateless UI                                       │   │
│  │  - Renders sections                                   │   │
│  │  - Forwards events to container                       │   │
│  └───────────────┬──────────────────────────────────────┘   │
│                  │                                          │
│  ┌───────────────▼──────────────────────────────────────┐   │
│  │                     Sections                          │   │
│  │  - Name, Birthdate, Gender, City, Language, Photo     │   │
│  │  - Preferences, Visibility, Business, Contact Info    │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
