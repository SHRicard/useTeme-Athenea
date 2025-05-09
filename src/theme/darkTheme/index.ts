import { MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';

export const darkTheme = {
    ...PaperDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        primary: '#BB86FC',       // Color principal para el tema oscuro
        accent: '#03DAC6',        // Color secundario para el tema oscuro
        background: '#121212',    // Fondo oscuro
        surface: '#333333',       // Fondo de las superficies
        text: '#E1E1E1',          // Color de texto
        textDisabled: '#A9A9A9',
        placeholder: '#757575',   // Color para placeholders
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



