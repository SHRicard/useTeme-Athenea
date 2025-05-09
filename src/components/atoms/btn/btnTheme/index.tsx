import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useThemeStore } from '@/store';
import { FontAwesomeIcon } from '../../icons';

export const BtnTheme = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const theme = useTheme();

    const Icon = isDarkMode ? 'sunny' : 'moon';  // Usamos los nombres de los iconos de Ionicons

    return (
        <TouchableOpacity onPress={toggleTheme} style={{ margin: 10 }}>
            <FontAwesomeIcon name={Icon} size={28} color={theme.colors.primary} />
        </TouchableOpacity>
    );
};

