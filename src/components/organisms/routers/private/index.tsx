import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useUserStore } from '@/store';
import { Redirect } from 'expo-router';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user } = useUserStore();
    if (!user) {
        return <Redirect href="/signin" />;
    }

    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
