import React from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions, StatusBar } from 'react-native';
import { Avatar, FontAwesomeIcon, Label } from '../../../atoms';
import { useAppTheme } from '@/hooks';
import { useDrawerStore, useUserStore } from '@/store';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/navigation';


interface IHeaderApp {
    direction: "left" | "right";
    onPress?: () => void;
    disabled?: boolean;
    viewType: string
}

export const HeaderApp = ({
    direction = "left",
    viewType = "default",
    onPress,
}: IHeaderApp) => {

    const { user } = useUserStore();
    const { width: screenWidth } = useWindowDimensions();
    const { openDrawer } = useDrawerStore();
    const theme = useAppTheme();

    const styles = StyleSheet.create({
        container: {
            width: screenWidth,
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 18,
            backgroundColor: theme.colors.backgroundColorPrimary,
            borderBottomColor: theme.colors.backgroundColorPrimary,
        },
        userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        userName: {
            marginLeft: 10,
            color: theme.colors.textOnPrimary,
            fontSize: 15,
            fontWeight: '600',
        },
        iconButton: {
            padding: 10,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 44,
            minHeight: 44,
        }

    });

    const router = useRouter();
    const role = user?.role
    const profileRole = APP_ROUTES.PRIVATE.PROFILE[role as string]

    const handleProfileNavigation = () => {
        router.push(profileRole);

    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.colors.backgroundColorPrimary}
                barStyle="light-content"
            />
            {viewType === "Home" && <>
                <TouchableOpacity style={styles.userInfo} onPress={handleProfileNavigation}>
                    <Avatar
                        size={40}
                        source={user?.avatar}
                    />
                    <Label text={user?.name ? `Hola ${user?.name}` : 'Hola'} style={styles.userName} />
                </TouchableOpacity>

                <TouchableOpacity onPress={openDrawer}>
                    <FontAwesomeIcon
                        name="bars"
                        size={24}
                        color={theme.colors.textOnPrimary}
                    />
                </TouchableOpacity>

            </>
            }
            {viewType !== "Home" && <>
                <TouchableOpacity onPress={onPress}>
                    <FontAwesomeIcon
                        name={`chevron-${direction}`}
                        size={24}
                        color={theme.colors.textOnPrimary}
                    />
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <Label text={viewType} style={styles.userName} />
                </View>


                <TouchableOpacity onPress={openDrawer}>
                    <FontAwesomeIcon
                        name="bars"
                        size={24}
                        color={theme.colors.textOnPrimary}
                    />
                </TouchableOpacity>

            </>
            }
            <StatusBar />
        </View>


    );
};
