import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import { useDrawerStore } from '@/store/useDrawerState';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    Easing,
    interpolate,
} from 'react-native-reanimated';
import { Avatar, Divider, FontAwesomeIcon, Label } from '../../../atoms';
import { useUserStore } from '@/store';
import { useAppTheme } from '@/hooks';
import { removeTokens } from '@/utils';

const ANIMATION_DURATION = 300;

export const Siderbar = () => {
    const { isOpen, closeDrawer } = useDrawerStore();
    const theme = useAppTheme();
    const { width, height } = useWindowDimensions();
    const drawerWidth = Platform.OS === 'web' ? 320 : width * 0.8;
    const { user, resetUser } = useUserStore();

    const progress = useSharedValue(0);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            progress.value = withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.exp),
            });
        } else {
            progress.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.exp),
            });
            const timeout = setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const drawerStyle = useAnimatedStyle(() => {
        const translateX = interpolate(progress.value, [0, 1], [-drawerWidth, 0]);
        const scale = interpolate(progress.value, [0, 1], [0.95, 1]);
        const opacity = interpolate(progress.value, [0, 1], [0.8, 1]);
        return { transform: [{ translateX }, { scale }], opacity };
    });

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 1], [0, 0.5]),
    }));

    if (!shouldRender) return null;

    const navigationUsers = [
        { label: 'Perfil', icon: 'user', color: theme.colors.textOnPrimary },
        { label: 'Configuración', icon: 'cog', color: theme.colors.textOnPrimary },
        { label: 'Mensajes', icon: 'envelope', color: theme.colors.textOnPrimary },
        { label: 'Notificaciones', icon: 'bell', color: theme.colors.textOnPrimary },
        { label: 'Ayuda', icon: 'question-circle', color: theme.colors.textOnPrimary },
        { label: 'Sobre nosotros', icon: 'info-circle', color: theme.colors.textOnPrimary },
    ];


    const logoutItem = {
        label: 'Cerrar sesión',
        icon: 'sign-out',
        color: theme.colors.textError,
    };
    const isLogout = () => {
        closeDrawer()
        resetUser()
        removeTokens()
    }
    return (
        <View style={styles.container} pointerEvents={isOpen ? 'auto' : 'none'}>
            <Animated.View style={[styles.overlay, overlayStyle]}>
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    onPress={closeDrawer}
                    activeOpacity={1}
                />
            </Animated.View>

            <Animated.View
                style={[
                    {
                        height,
                        width: drawerWidth,
                        backgroundColor: theme.colors.backgroundColorPrimary,
                    },
                    styles.drawer,
                    drawerStyle,
                ]}
            >
                <View style={styles.contentWrapper}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.profileContainer}>
                            <Avatar size={80} source={user?.avatar} />
                            <Label
                                text="Bienvenido"
                                style={[styles.welcomeText, { color: theme.colors.textOnPrimary }]}
                            />
                            <Label
                                text={`${user?.name} ${user?.lastName}`}
                                style={[styles.userName, { color: theme.colors.textOnPrimary }]}
                            />
                        </View>
                        <Divider />
                        <View style={styles.sectionContainer}>
                            <Label
                                text="Navegación"
                                style={[styles.sectionTitle, { color: theme.colors.textOnPrimary }]}
                            />
                            {navigationUsers.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.linkItem}>
                                    <FontAwesomeIcon
                                        name={item.icon}
                                        size={18}
                                        color={item.color}
                                    />
                                    <Label
                                        text={item.label}
                                        style={[styles.linkText, { color: item.color }]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.logoutContainer}>
                        <TouchableOpacity style={styles.linkItem}
                            onPress={isLogout}
                        >
                            <FontAwesomeIcon
                                name={logoutItem.icon}
                                size={18}
                                color={logoutItem.color}
                            />
                            <Label
                                text={logoutItem.label}
                                style={[styles.linkText, {
                                    color: logoutItem.color,
                                    fontWeight: "600"
                                }]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        elevation: Platform.OS === 'android' ? 50 : 0,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        zIndex: 1000,
        elevation: Platform.OS === 'android' ? 50 : 0,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1001,
        elevation: Platform.OS === 'android' ? 51 : 0,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollContent: {
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 12,
    },
    userName: {
        fontSize: 15,
        marginTop: 4,
    },
    sectionContainer: {
        marginTop: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
        cursor: 'pointer',
    },
    linkText: {
        fontSize: 15,
    },
    logoutContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,

    },
});
