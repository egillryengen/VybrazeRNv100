// src/features/user/screens/UserPerson/UserPerson.container.tsx

import React from "react";
import { useUserRepository } from "../../repositories/userRepository";
import { useAutoSaveUser } from "../../hooks/useAutoSaveUser";
import { UserPersonScreen } from "./UserPerson.screen";

export const UserPersonContainer = () => {
  // Henter bruker fra repository (Realm eller inMemory)
  const { user, updatePartial } = useUserRepository();

  // MMKV-basert autosave-draft
  const { draft, setDraftField, commitDraft } = useAutoSaveUser(user);

  return (
    <UserPersonScreen
      user={draft}
      onFieldChange={setDraftField}
      onSave={commitDraft}
      updatePartial={updatePartial}
    />
  );
};
