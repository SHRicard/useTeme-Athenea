import React from 'react';
import { Text, TextStyle, StyleProp, TextStyle as RNTextStyle } from 'react-native';
import { useAppTheme } from "@/hooks";

type LabelProps = {
  text: string;
  type?: 'primary' | 'secondary';
  size?: number;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<RNTextStyle>;
};

export const Label: React.FC<LabelProps> = ({
  text,
  type = 'secondary',
  size = 14,
  color,
  disabled = false,
  style,
}) => {
  const theme = useAppTheme();

  const textStyle: TextStyle = {
    fontWeight: type === 'primary' ? 'bold' : 'normal',
    fontSize: size,
    color: disabled ? theme.colors.textDisabled : color || theme.colors.text,
    opacity: disabled ? 0.6 : 1,
  };

  return <Text style={[textStyle, style]}>{text}</Text>;
};

