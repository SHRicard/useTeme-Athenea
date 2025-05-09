import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useAppTheme } from "@/hooks";

type TabsProps = React.ComponentProps<typeof Tabs>;

export const CustomTabs = ({
    children,
    screenOptions,
    ...props
}: TabsProps) => {
    const theme = useAppTheme();
    const { width: screenWidth } = useWindowDimensions();

    const maxWidth = 2000;
    const largeScreen = screenWidth >= maxWidth;

    return (
        <Tabs
            {...props}
            screenOptions={{
                headerStyle: {
                    height: 70
                },
                tabBarStyle: {
                    borderTopWidth: 0.8,
                    backgroundColor: theme.colors.background,
                    width: largeScreen ? maxWidth : "100%",
                    marginHorizontal: largeScreen ? "auto" : 0,
                },
                // sceneContainerStyle: {
                //     backgroundColor: theme.colors.background,
                //     width: largeScreen ? maxWidth : "100%",
                //     marginHorizontal: largeScreen ? "auto" : 0,
                // },
                ...screenOptions
            }}
        >
            {children}
        </Tabs>
    );
}