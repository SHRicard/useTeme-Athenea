import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '@/hooks';
import { Label } from '../../labels';
import { FontAwesomeIcon } from '../../icons';

interface ServiceSwitchProps {
  activeService: 'flights' | 'lodging';
  onServiceChange: (service: 'flights' | 'lodging') => void;
}

export const ServiceSwitch: React.FC<ServiceSwitchProps> = ({
  activeService,
  onServiceChange,
}) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          {
            borderBottomColor: activeService === 'flights' ? theme.colors.backgroundColorPrimary : 'transparent',
            borderBottomWidth: activeService === 'flights' ? 2 : 0,
          },
        ]}
        onPress={() => onServiceChange('flights')}
      >
        <FontAwesomeIcon
          name="plane"
          size={16}
          color={activeService === 'flights' ? theme.colors.backgroundColorPrimary : '#666666'}
        />
        <Label
          text="Vuelos"
          style={{
            color: activeService === 'flights' ? theme.colors.backgroundColorPrimary : '#666666',
            marginLeft: 4,
            fontSize: 14,
            fontWeight: activeService === 'flights' ? '600' : '400',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          {
            borderBottomColor: activeService === 'lodging' ? theme.colors.backgroundColorPrimary : 'transparent',
            borderBottomWidth: activeService === 'lodging' ? 2 : 0,
          },
        ]}
        onPress={() => onServiceChange('lodging')}
      >
        <FontAwesomeIcon
          name="building"
          size={16}
          color={activeService === 'lodging' ? theme.colors.backgroundColorPrimary : '#666666'}
        />
        <Label
          text="Alojamiento"
          style={{
            color: activeService === 'lodging' ? theme.colors.backgroundColorPrimary : '#666666',
            marginLeft: 4,
            fontSize: 14,
            fontWeight: activeService === 'lodging' ? '600' : '400',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
}); 