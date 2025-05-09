import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface ColumnProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface ThreeColumnsProps {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  style?: StyleProp<ViewStyle>;
  leftColumnStyle?: StyleProp<ViewStyle>;
  centerColumnStyle?: StyleProp<ViewStyle>;
  rightColumnStyle?: StyleProp<ViewStyle>;
}

export const LeftColumn: React.FC<ColumnProps> = ({ children, style }) => (
  <View style={[styles.leftColumn, style]}>
    {children}
  </View>
);

export const CenterColumn: React.FC<ColumnProps> = ({ children, style }) => (
  <View style={[styles.centerColumn, style]}>
    {children}
  </View>
);

export const RightColumn: React.FC<ColumnProps> = ({ children, style }) => (
  <View style={[styles.rightColumn, style]}>
    {children}
  </View>
);

export const ThreeColumns: React.FC<ThreeColumnsProps> = ({
  leftContent,
  centerContent,
  rightContent,
  style,
  leftColumnStyle,
  centerColumnStyle,
  rightColumnStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <LeftColumn style={leftColumnStyle}>
        {leftContent}
      </LeftColumn>
      <CenterColumn style={centerColumnStyle}>
        {centerContent}
      </CenterColumn>
      <RightColumn style={rightColumnStyle}>
        {rightContent}
      </RightColumn>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  centerColumn: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
}); 