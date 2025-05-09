import React from 'react';
import { Text, StyleSheet, View, TextStyle, ViewStyle } from 'react-native';
import { useAppTheme } from "@/hooks";

interface TitleProps {
  text: string;
  color: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  icon?: React.ReactElement;
  textAlign?: TextStyle['textAlign'];
  iconPosition?: 'left' | 'right';
  style?: TextStyle;
}

export const GeneralTitle: React.FC<TitleProps> = ({
  text,
  color,
  fontSize = 20,
  fontWeight = 'bold',
  icon,
  textAlign = 'left',
  iconPosition = 'left',
  style,
}) => {
  const textStyles: TextStyle = {
    color,
    fontSize,
    fontWeight,
    textAlign,
    ...style,
  };

  return (
    <View style={[styles.container, { justifyContent: textAlignToFlex(textAlign) }]}>
      {icon && iconPosition === 'left' && (
        <View style={styles.iconWrapper}>
          {React.cloneElement(icon, { color, size: fontSize })}
        </View>
      )}
      <Text style={textStyles}>{text}</Text>
      {icon && iconPosition === 'right' && (
        <View style={styles.iconWrapper}>
          {React.cloneElement(icon, { color, size: fontSize })}
        </View>
      )}
    </View>
  );
};

const textAlignToFlex = (align: TextStyle['textAlign']): ViewStyle['justifyContent'] => {
  switch (align) {
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});