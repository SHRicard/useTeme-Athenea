import { DefaultTheme as PaperLightTheme } from 'react-native-paper';

export const lightTheme = {
    ...PaperLightTheme,
    colors: {
        ...PaperLightTheme.colors,
        primary: '#6200EE',       // Color principal para el tema claro
        accent: '#03DAC6',        // Color secundario para el tema claro
        background: '#FFFFFF',    // Fondo blanco
        surface: '#FFFFFF',       // Fondo de las superficies
        text: '#000000',          // Color de texto
        textDisabled: '#A9A9A9',
        placeholder: '#BDBDBD',   // Color para placeholders
        notification: '#FF0266',  // Color de notificación
        //Colors
        backgroundColorPrimary: '#206080',
        backgroundColorSecondary: '#fff',
        backgroundColorTertiary: '#E6EDF1',
        textOnPrimary: '#fff',
        textOnSecondary: '#206080',
        textOnTertiary: '#074F72',
        textError: "#FF3B30"
    },
};


