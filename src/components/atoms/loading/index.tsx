import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '@/hooks';

export const Loading = () => {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                color={theme.colors.backgroundColorPrimary}
                size="large"
            />
            <Text style={[styles.text, { color: theme.colors.onBackground }]}>
                Iniciando sesión en Athenea...
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'white',
        elevation: 4,
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '500',
    },
});
