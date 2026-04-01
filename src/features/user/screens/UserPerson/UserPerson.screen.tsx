// src/features/user/screens/UserPerson/UserPerson.screen.tsx

import React from "react";
import { ScrollView } from "react-native";

// Seksjoner (disse filene lager vi etterpå, én og én)
import { UserNameSection } from "./sections/UserNameSection";
import { UserPhotoSection } from "./sections/UserPhotoSection";
import { UserBirthDateSection } from "./sections/UserBirthDateSection";
import { UserGenderSection } from "./sections/UserGenderSection";
import { UserCitySection } from "./sections/UserCitySection";
import { UserLanguageSection } from "./sections/UserLanguageSection";
import { UserContactInfoSection } from "./sections/UserContactInfoSection";
import { UserVisibilitySection } from "./sections/UserVisibilitySection";
import { UserPreferencesSection } from "./sections/UserPreferencesSection";
import { UserBusinessSection } from "./sections/UserBusinessSection";

export const UserPersonScreen = ({
  user,
  onFieldChange,
  onSave,
  updatePartial,
}) => {
  return (
    <ScrollView>
      <UserNameSection user={user} onChange={onFieldChange} />
      <UserPhotoSection user={user} onChange={onFieldChange} />
      <UserBirthDateSection user={user} onChange={onFieldChange} />
      <UserGenderSection user={user} onChange={onFieldChange} />
      <UserCitySection user={user} onChange={onFieldChange} />
      <UserLanguageSection user={user} onChange={onFieldChange} />
      <UserContactInfoSection user={user} onChange={onFieldChange} />
      <UserVisibilitySection user={user} onChange={onFieldChange} />
      <UserPreferencesSection user={user} onChange={onFieldChange} />

      {user?.type !== "Person" && (
        <UserBusinessSection user={user} onChange={onFieldChange} />
      )}
    </ScrollView>
  );
};
