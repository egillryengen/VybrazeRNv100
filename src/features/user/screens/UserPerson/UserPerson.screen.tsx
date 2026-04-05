// src/features/user/screens/UserPerson/UserPerson.screen.tsx
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {UserNameSection} from './sections/UserNameSection';
import {UserPhotoSection} from './sections/UserPhotoSection';
import {UserBirthDateSection} from './sections/UserBirthDateSection';
import {UserGenderSection} from './sections/UserGenderSection';
import {UserCitySection} from './sections/UserCitySection';
import {UserLanguageSection} from './sections/UserLanguageSection';
import {UserContactInfoSection} from './sections/UserContactInfoSection';
import {UserVisibilitySection} from './sections/UserVisibilitySection';
import {UserPreferencesSection} from './sections/UserPreferencesSection';
import {UserBusinessSection} from './sections/UserBusinessSection';

type AnyUser = Record<string, any>;

export interface UserPersonScreenProps {
  user: AnyUser;
  onFieldChange: (key: string, value: any) => void;
  updatePartial: (partial: Partial<AnyUser>) => Promise<AnyUser | null>;
  onSave: () => Promise<void>;
  isSaving: boolean;
  lastSaved: string | null;
}

export const UserPersonScreen: React.FC<UserPersonScreenProps> = ({
  user,
  onFieldChange,
  updatePartial,
  onSave,
  isSaving,
  lastSaved,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* PHOTO */}
      <UserPhotoSection
        photoUrl={user.photoUrl}
        onChangePhoto={v => onFieldChange('photoUrl', v)}
        onPickPhoto={() => {}}
      />

      {/* NAME */}
      <UserNameSection
        firstName={user.givenName}
        lastName={user.familyName}
        onChangeFirstName={v => onFieldChange('givenName', v)}
        onChangeLastName={v => onFieldChange('familyName', v)}
      />

      {/* BIRTH DATE */}
      <UserBirthDateSection
        value={user.birthDate}
        onChange={v => onFieldChange('birthDate', v)}
      />

      {/* GENDER */}
      <UserGenderSection
        value={user.gender}
        onChange={v => onFieldChange('gender', v)}
      />

      {/* CITY */}
      <UserCitySection
        city={user.city}
        onChangeCity={v => onFieldChange('city', v)}
      />

      {/* LANGUAGE */}
      <UserLanguageSection
        value={user.language}
        onChange={v => onFieldChange('language', v)}
      />

      {/* CONTACT INFO */}
      <UserContactInfoSection
        phone={user.phoneNumber}
        email={user.email}
        onChangePhone={v => onFieldChange('phoneNumber', v)}
        onChangeEmail={v => onFieldChange('email', v)}
      />

      {/* VISIBILITY — nå korrekt koblet */}
      <UserVisibilitySection
        value={user.visibility}
        onChange={v => onFieldChange('visibility', v)}
      />

      {/* PREFERENCES */}
      <UserPreferencesSection
        preferences={user.preferences ?? {}}
        onChange={partial => onFieldChange('preferences', partial)}
      />

      {/* BUSINESS */}
      <UserBusinessSection
        company={user.businessName}
        title={user.title}
        onChangeCompany={v => onFieldChange('businessName', v)}
        onChangeTitle={v => onFieldChange('title', v)}
      />

      <View style={styles.saveSection}>
        {/* SaveSection kan legges inn senere */}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  saveSection: {
    marginTop: 40,
    marginBottom: 60,
  },
});

export default UserPersonScreen;
