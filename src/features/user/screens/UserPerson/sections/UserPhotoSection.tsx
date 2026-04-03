// src/features/user/screens/UserPerson/sections/UserPhotoSection.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface UserPhotoSectionProps {
  photoUrl?: string;
  onChangePhoto?: (url: string) => void;
  onPickPhoto?: () => void; // optional callback to trigger native picker handled by container
  label?: string;
  placeholder?: string;
  testID?: string;
}

export const UserPhotoSection: React.FC<UserPhotoSectionProps> = ({
  photoUrl,
  onChangePhoto,
  onPickPhoto,
  label = 'Photo',
  placeholder = 'Paste image URL or use pick',
  testID,
}) => {
  const displayUrl = photoUrl ?? '';

  return (
    <View style={styles.container} testID={testID ?? 'user-photo-section'}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.previewRow}>
        <View style={styles.previewBox}>
          {displayUrl ? (
            <Image
              source={{uri: displayUrl}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No photo</Text>
            </View>
          )}
        </View>

        <View style={styles.controls}>
          <TextInput
            style={styles.input}
            value={displayUrl}
            placeholder={placeholder}
            onChangeText={text => onChangePhoto?.(text)}
            autoCapitalize="none"
            autoCorrect={false}
            testID="user-photo-url-input"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPickPhoto?.()}
            testID="user-photo-pick-button">
            <Text style={styles.buttonText}>Pick Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: '#222',
    marginBottom: 8,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewBox: {
    width: 88,
    height: 88,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
  },
  controls: {
    flex: 1,
  },
  input: {
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  button: {
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
