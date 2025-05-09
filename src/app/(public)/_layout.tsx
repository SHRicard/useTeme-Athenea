import { Stack } from "expo-router";
import { PublicRoute } from "@/components";
import { useAppTheme } from "@/hooks";


export default function TabLayout() {
    const theme = useAppTheme();
    return (
        <PublicRoute>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTitleStyle: {
                        color: theme.colors.primary,
                    },
                    contentStyle: { backgroundColor: theme.colors.background },
                    headerShadowVisible: false
                }}
            >
                <Stack.Screen name="landing/index" options={{ headerShown: false }} />
                <Stack.Screen name="signin/index" options={{ headerShown: false }} />
                <Stack.Screen name="signup/index" options={{ headerShown: false }} />
            </Stack>
        </PublicRoute>
    );
}
