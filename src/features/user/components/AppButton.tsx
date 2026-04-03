// src/common/components/AppButton.tsx
import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import {lightTheme} from 'src/common/theme/appTheme';
import {AppTextStyles} from 'src/common/theme/appTextStyles';

export enum AppButtonType {
  primary = 'primary',
  secondary = 'secondary',
  white = 'white',
  ghost = 'ghost',
  danger = 'danger',
}

type Props = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  type?: AppButtonType;
  backgroundOverride?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
};

export const AppButton: React.FC<Props> = ({
  label,
  onPress,
  type = AppButtonType.primary,
  backgroundOverride,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const theme = lightTheme;
  let background = theme.primary;
  let color = '#FFFFFF';
  let borderStyle: ViewStyle = {};

  switch (type) {
    case AppButtonType.secondary:
      background = theme.secondary;
      break;
    case AppButtonType.white:
      background = '#FFFFFF';
      color = theme.foreground;
      borderStyle = {borderWidth: 1, borderColor: `${theme.foreground}33`};
      break;
    case AppButtonType.ghost:
      background = 'transparent';
      color = theme.primary;
      break;
    case AppButtonType.danger:
      background = theme.destructive;
      break;
  }

  if (backgroundOverride) {
    background = backgroundOverride;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? label}
      style={({pressed}) => [
        styles.button,
        borderStyle,
        style,
        {
          backgroundColor: pressed ? theme.hoverBlue : background,
          opacity: disabled ? 0.6 : 1,
        },
      ]}>
      <Text style={[AppTextStyles.button, styles.label, {color}, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  label: {
    textAlign: 'center',
  },
});
