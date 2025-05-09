import { Stack } from "expo-router";
import { useWindowDimensions, StyleSheet } from "react-native";
import { useAppTheme } from "@/hooks";

type HeaderProps = React.ComponentProps<typeof Stack>;

export const HeaderApp = ({
    children,
    screenOptions,
    ...props
}: HeaderProps) => {
    const theme = useAppTheme();
    const { width: screenWidth } = useWindowDimensions();

    const maxWidth = 2000;
    const largeScreen = screenWidth >= maxWidth;

    return (
        <Stack
            {...props}
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    ...styles.header
                },
                headerTitleStyle: {
                    color: theme.colors.text,
                    ...styles.title
                },
                headerTintColor: theme.colors.text,
                headerShadowVisible: true,
                ...screenOptions
            }}
        >
            {children}
        </Stack>
    );
};

const styles = StyleSheet.create({
    header: {
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    }
});

// Añadimos Screen como propiedad estática
HeaderApp.Screen = Stack.Screen;
