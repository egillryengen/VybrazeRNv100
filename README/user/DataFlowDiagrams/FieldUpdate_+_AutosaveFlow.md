Field Update + Autosave Flow
┌──────────────────────────────┐
│ User edits a field in UI     │
└───────────────┬──────────────┘
                ▼
      onFieldChange()
                │
                ▼
     Update local container state
                │
                ▼
      useDebouncedSave()
                │
                ▼
     Wait for inactivity (debounce)
                │
                ▼
         updatePartial()
                │
                ▼
       userRepository.updateUser()
                │
                ▼
           Persist changes
