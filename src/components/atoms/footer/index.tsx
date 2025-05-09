import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface FooterProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  position?: 'absolute' | 'relative';
  backgroundColor?: string;
  height?: number;
  safeArea?: boolean;
}

interface FooterSectionProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ children, style }) => (
  <View style={[styles.section, style]}>
    {children}
  </View>
);

export const Footer: React.FC<FooterProps> = ({
  children,
  style,
  contentStyle,
  position = 'relative',
  backgroundColor = '#ffffff',
  height = 60,
  safeArea = true,
}) => {
  const containerStyle = [
    styles.container,
    {
      position,
      backgroundColor,
      height,
      paddingBottom: safeArea ? 20 : 0,
    },
    position === 'absolute' && styles.absolutePosition,
    style,
  ];

  return (
    <View style={containerStyle}>
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  absolutePosition: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 