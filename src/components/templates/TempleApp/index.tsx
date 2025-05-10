// app/components/TempleContainerApp.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeArea } from '../../../hooks';
import { useThemeStore } from '../../../store';
import { darkTheme, lightTheme } from '../../../theme';


interface TempleContainerAppProps {
    children: React.ReactNode;
}

export const TempleApp = ({ children }: TempleContainerAppProps) => {
    const safeArea = useSafeArea();
    const { isDarkMode } = useThemeStore();
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <View style={[styles.container, safeArea.all]}>
                    {children}
                </View>
            </PaperProvider>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
