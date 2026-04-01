// src/features/user/screens/UserPerson/sections/UserNameSection.tsx

import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  user: any;
  onChange: (field: string, value: any) => void;
};

export const UserNameSection = ({ user, onChange }: Props) => {
  return (
    <View>
      <Text>Display Name</Text>
      <TextInput
        value={user?.displayName ?? ""}
        onChangeText={(v) => onChange("displayName", v)}
      />

      <Text>Given Name</Text>
      <TextInput
        value={user?.givenName ?? ""}
        onChangeText={(v) => onChange("givenName", v)}
      />

      <Text>Family Name</Text>
      <TextInput
        value={user?.familyName ?? ""}
        onChangeText={(v) => onChange("familyName", v)}
      />
    </View>
  );
};
