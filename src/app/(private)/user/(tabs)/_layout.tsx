import { router, Tabs } from "expo-router";
import { CustomTabs, FontAwesomeIcon, HeaderApp, Label } from "@/components";
import { useAppTheme } from "@/hooks";
import { View } from "react-native";

export default function TabLayout() {
    const theme = useAppTheme();

    return (
        <CustomTabs>
            <Tabs.Screen
                name="dashboard/index"
                options={{
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: "red",
                    tabBarIcon: () => (
                        <View style={{ alignItems: "center", minWidth: 60 }}>
                            <FontAwesomeIcon
                                name="home"
                                size={25}
                                color={theme.colors.textOnPrimary}
                            />
                            <Label
                                type="primary"
                                text="Home"
                                style={{
                                    fontSize: 10,
                                    color: theme.colors.textOnPrimary
                                }}
                            />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: theme.colors.backgroundColorPrimary,
                        height: 60,
                        paddingTop: 10,
                        paddingBottom: 10,

                    },
                    headerLeft: () => (
                        <HeaderApp
                            direction="left"
                            viewType="Home"
                        />
                    ),
                    title: ""
                }}
            />
            <Tabs.Screen
                name="plans/index"
                options={{
                    tabBarIcon: () => (
                        <View style={{ alignItems: "center", minWidth: 60 }}>
                            <FontAwesomeIcon name="play" size={25} color={theme.colors.textOnPrimary} />
                            <Label type="primary" text="Planes" style={{ fontSize: 10, color: theme.colors.textOnPrimary, marginTop: 4 }} />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: theme.colors.backgroundColorPrimary,
                        height: 60,
                        paddingTop: 10,
                        paddingBottom: 10,

                    },
                    headerLeft: () => (
                        <HeaderApp
                            onPress={() => router.back()}
                            direction="left"
                            viewType="Planes"
                        />
                    ),
                    title: "",
                }}
            />
            <Tabs.Screen
                name="favorites/index"
                options={{
                    tabBarIcon: () => (
                        <View style={{ alignItems: "center", minWidth: 60 }}>
                            <FontAwesomeIcon
                                name="heart"
                                size={25}
                                color={theme.colors.textOnPrimary} />
                            <Label type="primary" text="Favoritos" style={{ fontSize: 10, color: theme.colors.textOnPrimary, marginTop: 4 }} />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: theme.colors.backgroundColorPrimary,
                        height: 60,
                        paddingTop: 10,
                        paddingBottom: 10,

                    },
                    headerLeft: () => (
                        <HeaderApp
                            onPress={() => router.back()}
                            direction="left"
                            viewType="Favoritos"
                        />
                    ),
                    title: "",
                }}
            />
            <Tabs.Screen
                name="notifications/index"
                options={{
                    tabBarIcon: () => (
                        <View style={{ alignItems: "center", minWidth: 80 }}>
                            <FontAwesomeIcon
                                name="bell"
                                size={20}
                                color={theme.colors.textOnPrimary}
                            />
                            <Label
                                type="primary"
                                text="Notificaciones"
                                style={{
                                    fontSize: 10,
                                    color: theme.colors.textOnPrimary,
                                    marginTop: 4
                                }} />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: theme.colors.backgroundColorPrimary,
                        height: 60,
                        paddingTop: 10,
                        paddingBottom: 10,

                    },
                    headerLeft: () => (
                        <HeaderApp
                            onPress={() => router.back()}
                            direction="left"
                            viewType="Notificaciones"
                        />
                    ),
                    title: "",
                }}
            />
        </CustomTabs>
    );
}
