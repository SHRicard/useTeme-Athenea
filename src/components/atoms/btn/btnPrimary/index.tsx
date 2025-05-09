import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { useAppTheme } from "@/hooks";

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'tertiary';
  type?: 'normal' | 'outline';
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  maxWidth?: number;
}

export const BtnPrimary: React.FC<ButtonProps> = ({
  color = 'primary',
  type = 'normal',
  label,
  onPress,
  disabled = false,
  loading = false,
  maxWidth,
}) => {
  const theme = useAppTheme()
  const backgroundColors: Record<'primary' | 'secondary' | 'tertiary', string> = {
    primary: theme.colors.backgroundColorPrimary,
    secondary: theme.colors.backgroundColorSecondary,
    tertiary: theme.colors.backgroundColorTertiary
  };
  const textColors: Record<'primary' | 'secondary' | 'tertiary', string> = {
    primary: theme.colors.textOnPrimary,
    secondary: theme.colors.textOnSecondary,
    tertiary: theme.colors.textOnTertiary
  };

  const getBackgroundColor = () => {
    if (type === 'outline') return 'transparent';
    return backgroundColors[color as 'primary' | 'secondary' | 'tertiary'] || backgroundColors.primary;
  };

  const getBorderColor = () => {
    return backgroundColors[color as 'primary' | 'secondary' | 'tertiary'] || backgroundColors.primary;
  };
  const getTextColor = (): string => {
    if (type === 'outline') return backgroundColors[color as 'primary' | 'secondary' | 'tertiary'];
    return textColors[color as 'primary' | 'secondary' | 'tertiary'] || backgroundColors.primary;
  };

  const containerStyles: ViewStyle = {
    ...styles.base,
    backgroundColor: getBackgroundColor(),
    borderColor: type === 'outline' ? getBorderColor() : 'transparent',
    borderWidth: type === 'outline' ? 1.5 : 0,
    maxWidth,
    opacity: disabled || loading ? 0.6 : 1,
  };

  const textStyles: TextStyle = {
    color: getTextColor(),
    fontWeight: '600',
    fontSize: 16,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      activeOpacity={0.7}
      style={[containerStyles, {
        borderColor: theme.colors.textOnSecondary,
        borderWidth: type === 'outline' ? 1.5 : 0
      }]}
    >
      <Text style={textStyles}>
        {loading ? 'Cargando...' : label}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

