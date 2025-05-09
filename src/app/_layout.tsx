import React from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useThemeStore } from '@/store';
import { useSafeArea } from '@/hooks';
import { Siderbar } from '../components/organisms';
import { darkTheme, lightTheme } from '../theme';

const RootLayout = () => {
    const { isDarkMode } = useThemeStore();
    const theme = isDarkMode ? darkTheme : lightTheme;
    const safeArea = useSafeArea();

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <View style={[{ flex: 1 }, safeArea.all]}>
                    <Stack
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: theme.colors.background,
                            },
                            contentStyle: {
                                backgroundColor: theme.colors.background,
                            },
                        }}
                    >
                        <Stack.Screen name="(public)" options={{ headerShown: false }} />
                        <Stack.Screen name="(private)" options={{ headerShown: false }} />
                    </Stack>
                    <Siderbar />
                </View>
            </PaperProvider>
        </SafeAreaProvider>
    );
};

export default RootLayout;
